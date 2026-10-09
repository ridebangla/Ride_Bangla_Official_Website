// Server-only helper. Needs FIREBASE_SERVICE_ACCOUNT_KEY env var — the full
// JSON key from Firebase Console → Project Settings → Service Accounts →
// "Generate new private key", pasted in as ONE single-line value.
// Never prefix this with VITE_ (must never reach the browser).
//
// IMPORTANT: firebase-admin (and its Firestore/gRPC dependencies) is only
// safe to import lazily here. On Vercel's Nitro build, every route module
// (including src/routes/api.webhook.ts) is statically bundled into ONE
// shared server function. A top-level `import ... from "firebase-admin/..."`
// used to run the moment that shared function booted — for every route,
// not just the webhook — and firebase-admin's Firestore/gRPC dependency
// (google-gax) is not ESM-safe (it reads `__dirname`, which does not exist
// in an ESM bundle), so the whole site crashed on every single request.
// Dynamic imports defer loading this dependency until a webhook request
// actually needs it.

let cachedApp: import("firebase-admin/app").App | undefined;

async function getAdminApp() {
  if (cachedApp) return cachedApp;

  const { cert, getApps, initializeApp } = await import("firebase-admin/app");
  if (getApps().length) {
    cachedApp = getApps()[0]!;
    return cachedApp;
  }

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var is missing");
  }

  const serviceAccount = JSON.parse(raw);
  cachedApp = initializeApp({ credential: cert(serviceAccount) });
  return cachedApp;
}

export async function getAdminDb() {
  const { getFirestore } = await import("firebase-admin/firestore");
  return getFirestore(await getAdminApp());
}
