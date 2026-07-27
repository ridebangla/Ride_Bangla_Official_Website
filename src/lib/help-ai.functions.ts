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
Ride Bangla is a Bangladesh-based multi-service technology ecosystem covering ride sharing, food delivery, courier delivery, marketplace services (including groceries, daily essentials and medicine), customer, rider, partner and agent platforms, and Ride Bangla Studio digital services.

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
    const key = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!key) {
      return {
        ok: false as const,
        error: "AI support is temporarily unavailable. Please use official Support.",
      };
    }

    try {
      const contents = [
        ...data.history.map((item) => ({
          role: item.role,
          parts: [{ text: item.text }],
        })),
        { role: "user" as const, parts: [{ text: data.question }] },
      ];

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
            generationConfig: { temperature: 0.25, maxOutputTokens: 800 },
          }),
        },
      );

      if (!res.ok) {
        return {
          ok: false as const,
          error: "AI support is temporarily unavailable. Please try again or use official Support.",
        };
      }

      const json = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const answer = json.candidates?.[0]?.content?.parts
        ?.map((part) => part.text ?? "")
        .join("")
        .trim();

      if (!answer) {
        return {
          ok: false as const,
          error: "AI support could not generate an answer. Please use official Support.",
        };
      }

      return { ok: true as const, answer };
    } catch {
      return {
        ok: false as const,
        error: "AI support is temporarily unavailable. Please use official Support.",
      };
    }
  });
