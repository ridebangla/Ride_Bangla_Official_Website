import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const HistoryItemSchema = z.object({
  role: z.enum(["user", "model"]),
  text: z.string().trim().min(1).max(4000),
});

const InputSchema = z.object({
  question: z.string().trim().min(2).max(2000),
  history: z.array(HistoryItemSchema).max(12).default([]),
});

const SYSTEM_PROMPT = `You are the official Ride Bangla AI Help Assistant for ridebangla.bd.
Ride Bangla is a Bangladesh-based multi-service technology ecosystem covering ride sharing, food delivery, courier delivery, marketplace services (including groceries, daily essentials and medicine), customer, rider, partner and agent platforms, and Ride Bangla IT digital services.

Service coverage (IMPORTANT - be accurate):
- Currently serving: Faridpur (primary) and Shariatpur districts
- Expanding to all of Bangladesh gradually - nationwide launch coming soon, not yet available everywhere
- Some deliveries are confirmed from Faridpur on a case-by-case basis
- Website is still being completed; some sections show "coming soon"

Rules:
- Answer in the user's language (Bangla or English) using concise, clear and professional wording.
- Help only with general Ride Bangla services, apps, onboarding, account guidance, support routes and published policies.
- Never claim access to a user's account, order, payment, live location, private records or admin systems.
- Never invent prices, delivery times, launch dates, coverage areas, features, partners, policies or availability.
- For account-specific, order-specific, payment, refund, safety or urgent issues, direct the user to official human Support through the Contact page or the configured official support channels.
- When information is uncertain or not present in the conversation, say that it should be confirmed with official Support.`;

export const askHelpAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    // NOTE: Groq decommissioned llama-3.3-70b-versatile on 2026-08-16.
    // Current Groq-recommended models: openai/gpt-oss-120b (flagship), openai/gpt-oss-20b (fast).
    // The env override comes first; the built-ins act as fallback if a model is retired.
    const groqModels = Array.from(
      new Set([
        process.env.GROQ_MODEL || "openai/gpt-oss-120b",
        "openai/gpt-oss-120b",
        "openai/gpt-oss-20b",
      ]),
    );

    if (!groqKey && !geminiKey) {
      return {
        ok: false as const,
        error: "AI support is temporarily unavailable. Please use official Support.",
      };
    }

    // A hung upstream call keeps the server function open until the edge/
    // platform itself times out, which comes back to the browser as a
    // gateway-style 5xx error instead of the graceful message below. An
    // explicit abort timeout guarantees this handler always resolves.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20_000);

    try {
      // Build OpenAI-style messages for Groq, or Gemini-style contents
      const historyMessages = data.history.map((item) => ({
        role: item.role === "model" ? "assistant" : "user",
        content: item.text,
      }));

      let answer: string | null = null;

      // Try Groq first (free tier, no billing required).
      // Loop over candidate models so a future Groq model retirement
      // degrades to the next model instead of killing the chat.
      if (groqKey) {
        for (const groqModel of groqModels) {
          const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${groqKey}`,
            },
            body: JSON.stringify({
              model: groqModel,
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...historyMessages,
                { role: "user", content: data.question },
              ],
              temperature: 0.3,
              max_tokens: 800,
            }),
            signal: controller.signal,
          });

          if (groqRes.ok) {
            const groqJson = (await groqRes.json()) as {
              choices?: Array<{ message?: { content?: string } }>;
            };
            answer = groqJson.choices?.[0]?.message?.content?.trim() || null;
            if (answer) break;
            console.error("[help-ai] Groq returned ok but empty answer", groqModel);
            break;
          }

          // Log the real upstream error to Vercel runtime logs for diagnosis.
          let errBody = "";
          try {
            errBody = (await groqRes.text()).slice(0, 300);
          } catch {
            errBody = "<unreadable>";
          }
          console.error(`[help-ai] Groq request failed model=${groqModel} status=${groqRes.status} body=${errBody}`);

          // A 404 means this model id is retired — try the next candidate.
          // Any other status (401 bad key, 429 rate limit, 5xx) will not be
          // fixed by switching models, so stop and fall through.
          if (groqRes.status !== 404) break;
        }
      }

      // Fallback to Gemini if Groq failed or no Groq key
      if (!answer && geminiKey) {
        const contents = [
          ...data.history.map((item) => ({
            role: item.role,
            parts: [{ text: item.text }],
          })),
          { role: "user" as const, parts: [{ text: data.question }] },
        ];

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModel)}:generateContent?key=${encodeURIComponent(geminiKey)}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
              contents,
              generationConfig: { temperature: 0.25, maxOutputTokens: 800 },
            }),
            signal: controller.signal,
          },
        );

        if (res.ok) {
          const json = (await res.json()) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          answer =
            json.candidates?.[0]?.content?.parts
              ?.map((part) => part.text ?? "")
              .join("")
              .trim() || null;
        } else {
          let errBody = "";
          try {
            errBody = (await res.text()).slice(0, 300);
          } catch {
            errBody = "<unreadable>";
          }
          console.error(`[help-ai] Gemini request failed status=${res.status} body=${errBody}`);
        }
      }

      clearTimeout(timeoutId);

      if (!answer) {
        return {
          ok: false as const,
          error: "AI support is temporarily unavailable. Please try again or use official Support.",
        };
      }

      return { ok: true as const, answer };
    } catch (err) {
      clearTimeout(timeoutId);
      console.error("[help-ai] handler exception", err instanceof Error ? err.message : err);
      return {
        ok: false as const,
        error: "AI support is temporarily unavailable. Please use official Support.",
      };
    }
  });
