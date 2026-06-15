import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const InputSchema = z.object({
  question: z.string().trim().min(2).max(2000),
});

const SYSTEM_PROMPT = `You are the Ride Bangla AI Help Assistant.
Ride Bangla is a Bangladesh-based technology company founded in Faridpur. Its current focus is Food Delivery and Courier services, with future expansion into Ride Bangla (Customer App), Ride Bangla Rider, Ride Bangla Partner, Ride Bangla Agent and Ride Bangla Pay.

Rules:
- Answer concisely (max ~6 short sentences or a small bullet list) in the user's language (English or Bangla).
- Help with: how Ride Bangla works, services, app availability, order/delivery process, becoming a rider/partner/agent, account help, payment, coverage area (currently Faridpur), and general policy questions.
- For pricing, ETA, live order status, refunds for specific orders, or anything requiring account access, tell the user you cannot access personal account data and recommend contacting human Support via the Contact form, email support@ridebangla.bd or phone +880 1309-587749.
- If you are unsure, say so and recommend contacting Support.
- Never invent features, partners, dates or coverage cities.`;

export const askHelpAi = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      return { ok: false as const, error: "AI is not configured. Please contact Support." };
    }
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(key)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ role: "user", parts: [{ text: data.question }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
          }),
        },
      );
      if (!res.ok) {
        return { ok: false as const, error: "AI is temporarily unavailable. Please try again or contact Support." };
      }
      const json = (await res.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
      };
      const answer = json.candidates?.[0]?.content?.parts?.map((p) => p.text ?? "").join("").trim();
      if (!answer) {
        return { ok: false as const, error: "Sorry, I couldn't generate an answer. Please contact Support." };
      }
      return { ok: true as const, answer };
    } catch {
      return { ok: false as const, error: "AI is temporarily unavailable. Please contact Support." };
    }
  });