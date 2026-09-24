import { getHistory, appendTurn } from "./lib.bot-memory";

const SYSTEM_PROMPT = `আপনি "Ride Bangla Assistant" — Ride Bangla-র অফিসিয়াল কাস্টমার সহকারী।
সংক্ষিপ্ত, বন্ধুত্বপূর্ণ ও সহায়ক উত্তর দিন। কাস্টমার বাংলায় লিখলে বাংলায়, ইংরেজিতে
লিখলে ইংরেজিতে উত্তর দিন। Ride Bangla একটি বাংলাদেশি রাইড-হেইলিং ও ডেলিভারি সেবা।`;

// This is the "ai agent" box in the diagram: model + mem combined into one reply.
export async function generateReply(
  conversationId: string,
  incomingText: string,
): Promise<string> {
  // 1. mem — pull this customer's past turns so the AI has context
  const history = await getHistory(conversationId);

  const contents = [
    ...history.map((t) => ({
      role: t.role === "user" ? "user" : "model",
      parts: [{ text: t.text }],
    })),
    { role: "user", parts: [{ text: incomingText }] },
  ];

  // 2. model — ask Gemini for a reply, grounded in that history
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";

  let replyText = "দুঃখিত, এই মুহূর্তে সহকারী সেবা বন্ধ আছে। একটু পরে চেষ্টা করুন।";

  if (apiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents,
          }),
        },
      );
      const data = await res.json();
      replyText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "দুঃখিত, বুঝতে পারিনি। আবার একটু বলবেন?";
    } catch (err) {
      console.error("Gemini call failed:", err);
    }
  }

  // 3. mem — save this exchange so the *next* message remembers it too
  const now = Date.now();
  await appendTurn(conversationId, { role: "user", text: incomingText, at: now });
  await appendTurn(conversationId, { role: "assistant", text: replyText, at: now + 1 });

  return replyText;
}
