import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
// Loaded only when a webhook POST actually needs the AI bot. This keeps the\n// Firebase Admin / bot dependency tree out of normal page SSR.\n
// ── Env vars you must add in Vercel (Project Settings → Environment Variables) ──
// WEBHOOK_VERIFY_TOKEN        -> any string you invent, e.g. "ridebangla_verify_2026"
// PAGE_ACCESS_TOKEN           -> Meta App → Messenger → Access Tokens
// WHATSAPP_ACCESS_TOKEN       -> Meta App → WhatsApp → API Setup
// WHATSAPP_PHONE_NUMBER_ID    -> Meta App → WhatsApp → API Setup
// FIREBASE_SERVICE_ACCOUNT_KEY-> Firebase Console → Project Settings → Service accounts
// GEMINI_API_KEY / GEMINI_MODEL -> already in your .env.example
// None of these should ever be prefixed with VITE_.

const GRAPH_VERSION = "v21.0";

async function sendMessengerReply(recipientId: string, text: string) {
  const token = process.env.PAGE_ACCESS_TOKEN;
  if (!token) return;
  await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/me/messages?access_token=${token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      recipient: { id: recipientId },
      message: { text },
    }),
  });
}

async function sendWhatsAppReply(toNumber: string, text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return;
  await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: toNumber,
      text: { body: text },
    }),
  });
}

export const Route = createFileRoute("/api/webhook")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token");
        const challenge = url.searchParams.get("hub.challenge");

        if (mode === "subscribe" && token === process.env.WEBHOOK_VERIFY_TOKEN) {
          return new Response(challenge ?? "", { status: 200 });
        }
        return new Response("Forbidden", { status: 403 });
      },

      POST: async ({ request }) => {
        const body = await request.json();
        const { generateReply } = await import("@/lib/bot-brain");

        try {
          if (body.object === "page") {
            // ── Messenger ──
            for (const entry of body.entry ?? []) {
              for (const event of entry.messaging ?? []) {
                const senderId = event.sender?.id;
                const text = event.message?.text;
                if (senderId && text) {
                  const conversationId = `messenger_${senderId}`;
                  const reply = await generateReply(conversationId, text);
                  await sendMessengerReply(senderId, reply);
                }
              }
            }
          } else if (body.object === "whatsapp_business_account") {
            // ── WhatsApp ──
            for (const entry of body.entry ?? []) {
              for (const change of entry.changes ?? []) {
                const messages = change.value?.messages ?? [];
                for (const msg of messages) {
                  const from = msg.from;
                  const text = msg.text?.body;
                  if (from && text) {
                    const conversationId = `whatsapp_${from}`;
                    const reply = await generateReply(conversationId, text);
                    await sendWhatsAppReply(from, reply);
                  }
                }
              }
            }
          }
        } catch (err) {
          console.error("Webhook processing error:", err);
        }

        // Always return 200 quickly — Meta retries aggressively if you don't.
        return new Response("EVENT_RECEIVED", { status: 200 });
      },
    },
  },
});
