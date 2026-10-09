import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { createHmac, timingSafeEqual } from "node:crypto";
import { generateReply } from "@/lib/lib.bot-brain";

// ── Env vars you must add in Vercel (Project Settings → Environment Variables) ──
// WEBHOOK_VERIFY_TOKEN        -> any string you invent, e.g. "ridebangla_verify_2026"
// META_APP_SECRET             -> Meta App → Settings → Basic → App Secret (for X-Hub-Signature-256 verification)
// PAGE_ACCESS_TOKEN           -> Meta App → Messenger → Access Tokens
// WHATSAPP_ACCESS_TOKEN       -> Meta App → WhatsApp → API Setup
// WHATSAPP_PHONE_NUMBER_ID    -> Meta App → WhatsApp → API Setup
// FIREBASE_SERVICE_ACCOUNT_KEY-> Firebase Console → Project Settings → Service accounts
// GEMINI_API_KEY / GEMINI_MODEL -> already in your .env.example
// None of these should ever be prefixed with VITE_.

const GRAPH_VERSION = "v21.0";

/** Verify Meta's X-Hub-Signature-256 header to reject forged webhook POSTs. */
function verifyMetaSignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.META_APP_SECRET;
  // If no app secret configured, skip verification (dev mode) — log a warning.
  if (!appSecret) {
    console.warn("META_APP_SECRET not set — skipping webhook signature verification");
    return true;
  }
  if (!signatureHeader?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", appSecret).update(rawBody, "utf8").digest("hex");
  const received = signatureHeader.slice("sha256=".length);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(received, "utf8"));
}

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
        // Verify Meta signature BEFORE parsing — rejects forged/spam POSTs.
        const rawBody = await request.text();
        const signature = request.headers.get("x-hub-signature-256");
        if (!verifyMetaSignature(rawBody, signature)) {
          return new Response("Forbidden", { status: 403 });
        }

        let body: any;
        try {
          body = JSON.parse(rawBody);
        } catch {
          return new Response("Bad Request", { status: 400 });
        }

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
