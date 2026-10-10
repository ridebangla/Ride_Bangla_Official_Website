import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredFirebaseKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
] as const;

export const isFirebaseConfigured = requiredFirebaseKeys.every((key) => {
  const value = firebaseConfig[key];
  return typeof value === "string" && value.trim().length > 0;
});

if (!isFirebaseConfigured) {
  console.warn(
    "Firebase environment variables are missing. Add the VITE_FIREBASE_* values before production deployment."
  );
}

const app = isFirebaseConfigured
  ? getApps().length > 0
    ? getApp()
    : initializeApp(firebaseConfig)
  : null;

export const firebaseApp = app;
export const firebaseDb = app ? getFirestore(app) : null;
// TEMPORARILY DISABLED to diagnose auth/internal-error in Google redirect flow.
// If auth works without App Check, the reCAPTCHA site key or enforcement is the culprit.
// if (app && typeof window !== "undefined" && import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY) {
//   try {
//     initializeAppCheck(app, {
//       provider: new ReCaptchaV3Provider(import.meta.env.VITE_FIREBASE_APPCHECK_SITE_KEY),
//       isTokenAutoRefreshEnabled: true,
//     });
//   } catch (error) {
//     console.warn("Firebase App Check could not be initialized.", error);
//   }
// }

export const firebaseStorage = app ? getStorage(app) : null;

export const firebaseAuth = app ? getAuth(app) : null;

// CRITICAL: Explicitly set browserLocalPersistence so the auth state survives
// the signInWithRedirect page reload. Without this, some mobile browsers fall
// back to in-memory persistence and the user is lost after redirect.
if (firebaseAuth && typeof window !== "undefined") {
  setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
    // If persistence fails, auth will still work for the session
  });
}
export const googleAuthProvider = new GoogleAuthProvider();
// Always show the Google account picker instead of silently re-using the last
// signed-in account, so a shared/kiosk device can't post a review under the
// wrong person's name by accident.
googleAuthProvider.setCustomParameters({ prompt: "select_account" });
