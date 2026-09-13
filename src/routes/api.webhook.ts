import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// ── Env vars you must add in Vercel (Project Settings → Environment Variables) ──
// WEBHOOK_VERIFY_TOKEN   -> any string you invent yourself, e.g. "ridebangla_verify_2026"
//                            (you'll paste this same value into the Meta App webhook screen)
// PAGE_ACCESS_TOKEN      -> from Meta App → Messenger → Access Tokens (after linking your Page)
// WHATSAPP_ACCESS_TOKEN  -> from Meta App → WhatsApp → API Setup (temporary token to start)
// WHATSAPP_PHONE_NUMBER_ID -> from Meta App → WhatsApp → API Setup ("Phone number ID")
// These are server-only — never prefix them with VITE_.

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
      // Meta calls this once, when you click "Verify and Save" on the webhook screen.
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

      // Every real Messenger / WhatsApp message arrives here.
      POST: async ({ request }) => {
        const body = await request.json();

        try {
          if (body.object === "page") {
            // ── Messenger ──
            for (const entry of body.entry ?? []) {
              for (const event of entry.messaging ?? []) {
                const senderId = event.sender?.id;
                const text = event.message?.text;
                if (senderId && text) {
                  console.log("Messenger message:", senderId, text);
                  // TODO: replace this line with a call to your AI agent (Gemini)
                  await sendMessengerReply(
                    senderId,
                    "Ride Bangla-তে স্বাগতম! এই মুহূর্তে আমরা টেস্ট মোডে আছি। শীঘ্রই AI সহকারী চালু হবে।",
                  );
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
                    console.log("WhatsApp message:", from, text);
                    // TODO: replace this line with a call to your AI agent (Gemini)
                    await sendWhatsAppReply(
                      from,
                      "Ride Bangla-তে স্বাগতম! এই মুহূর্তে আমরা টেস্ট মোডে আছি। শীঘ্রই AI সহকারী চালু হবে।",
                    );
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
