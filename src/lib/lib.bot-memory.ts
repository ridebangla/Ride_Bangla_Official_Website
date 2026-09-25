import { getAdminDb } from "./lib.firebase-admin";

export type ChatTurn = {
  role: "user" | "assistant";
  text: string;
  at: number;
};

// How many past messages (user + assistant combined) to remember per customer.
// Higher = AI remembers more of the old conversation, but costs more per reply.
const MAX_TURNS = 12;

// conversationId should uniquely identify one customer on one platform,
// e.g. "messenger_1234567890" or "whatsapp_8801XXXXXXXXX"
export async function getHistory(conversationId: string): Promise<ChatTurn[]> {
  const db = await getAdminDb();
  const snap = await db
    .collection("bot_conversations")
    .doc(conversationId)
    .collection("messages")
    .orderBy("at", "desc")
    .limit(MAX_TURNS)
    .get();

  return snap.docs.map((d) => d.data() as ChatTurn).reverse();
}

export async function appendTurn(conversationId: string, turn: ChatTurn) {
  const db = await getAdminDb();
  await db
    .collection("bot_conversations")
    .doc(conversationId)
    .collection("messages")
    .add(turn);
}
