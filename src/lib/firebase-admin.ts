import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Server-only helper. Needs FIREBASE_SERVICE_ACCOUNT_KEY env var — the full
// JSON key from Firebase Console → Project Settings → Service Accounts →
// "Generate new private key", pasted in as ONE single-line value.
// Never prefix this with VITE_ (must never reach the browser).

function getAdminApp() {
  if (getApps().length) return getApps()[0]!;

  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) {
    throw new Error("FIREBASE_SERVICE_ACCOUNT_KEY env var is missing");
  }

  const serviceAccount = JSON.parse(raw);
  return initializeApp({ credential: cert(serviceAccount) });
}

export function getAdminDb() {
  return getFirestore(getAdminApp());
}
