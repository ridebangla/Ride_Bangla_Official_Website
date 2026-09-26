import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "en" | "bn";
type Dictionary = Record<string, { en: string; bn: string }>;

const dictionary: Dictionary = {
  home: { en: "Home", bn: "হোম" },
  about: { en: "About", bn: "পরিচিতি" },
  services: { en: "Services", bn: "সেবাসমূহ" },
  apps: { en: "Apps", bn: "অ্যাপসমূহ" },
  updates: { en: "Updates", bn: "আপডেট" },
  help: { en: "Help Center", bn: "সহায়তা কেন্দ্র" },
  contact: { en: "Contact", bn: "যোগাযোগ" },
  notifications: { en: "Website Updates", bn: "ওয়েবসাইট আপডেট" },
  latestAnnouncements: { en: "Latest Ride Bangla announcements", bn: "Ride Bangla-এর সর্বশেষ ঘোষণা" },
  noUpdates: { en: "No updates yet.", bn: "এখনো কোনো আপডেট নেই।" },
  viewAllUpdates: { en: "View all updates", bn: "সব আপডেট দেখুন" },
  digitalEcosystem: { en: "Digital Ecosystem", bn: "ডিজিটাল ইকোসিস্টেম" },
  quickLinks: { en: "Quick Links", bn: "দ্রুত লিংক" },
  support: { en: "Support", bn: "সহায়তা" },
  connect: { en: "Connect", bn: "যোগাযোগ" },
  getHelp: { en: "Get Help", bn: "সহায়তা নিন" },
  footerDescription: {
    en: "Ride Bangla is building Bangladesh's trusted digital ecosystem for customers, partners, riders, agents, marketplace, courier and professional digital services.",
    bn: "Ride Bangla কাস্টমার, পার্টনার, রাইডার, এজেন্ট, মার্কেটপ্লেস, কুরিয়ার এবং পেশাদার ডিজিটাল সেবার জন্য বাংলাদেশের বিশ্বস্ত ডিজিটাল ইকোসিস্টেম তৈরি করছে।",
  },
};

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof dictionary) => string;
  pick: (en?: string | null, bn?: string | null) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Keep the server and first client render identical to avoid hydration errors.
  // The saved preference is restored immediately after the app mounts.
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("ride_bangla_language");
      if (stored === "bn" || stored === "en") setLanguageState(stored);
    } catch {
      // English remains the safe default when storage is unavailable.
    }
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  const setLanguage = (next: Language) => {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem("ride_bangla_language", next);
      } catch {
        // Language switching must keep working even when storage is blocked.
      }
      document.documentElement.lang = next === "bn" ? "bn" : "en";
      document.documentElement.dir = "ltr";
    }
  };

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === "en" ? "bn" : "en"),
    t: (key) => dictionary[key][language],
    pick: (en, bn) => (language === "bn" ? bn || en || "" : en || bn || ""),
  }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const value = useContext(LanguageContext);
  if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
  return value;
}
