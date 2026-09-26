import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

type Language = "en" | "bn";
type TranslationPair = { en: string; bn: string };

const translations: TranslationPair[] = [
  { en: "Page not found", bn: "পৃষ্ঠা পাওয়া যায়নি" },
  { en: "The page you're looking for doesn't exist or has been moved.", bn: "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই অথবা স্থানান্তর করা হয়েছে।" },
  { en: "Go home", bn: "হোমে ফিরে যান" },
  { en: "This page didn't load", bn: "এই পৃষ্ঠাটি লোড হয়নি" },
  { en: "Something went wrong on our end. You can try refreshing or head back home.", bn: "আমাদের দিকে একটি সমস্যা হয়েছে। পৃষ্ঠাটি রিফ্রেশ করুন অথবা হোমে ফিরে যান।" },
  { en: "Try again", bn: "আবার চেষ্টা করুন" },
  { en: "Home", bn: "হোম" },
  { en: "About", bn: "পরিচিতি" },
  { en: "About Ride Bangla", bn: "Ride Bangla সম্পর্কে" },
  { en: "Services", bn: "সেবাসমূহ" },
  { en: "Apps", bn: "অ্যাপসমূহ" },
  { en: "Updates", bn: "আপডেট" },
  { en: "Help Center", bn: "সহায়তা কেন্দ্র" },
  { en: "Contact", bn: "যোগাযোগ" },
  { en: "Latest Update", bn: "সর্বশেষ আপডেট" },
  { en: "Read More", bn: "বিস্তারিত পড়ুন" },
  { en: "Email for updates", bn: "আপডেট পেতে ইমেইল" },
  { en: "Notify Me", bn: "আমাকে জানাও" },
  { en: "Saving...", bn: "সংরক্ষণ হচ্ছে..." },
  { en: "Explore Our Apps", bn: "আমাদের অ্যাপ দেখুন" },
  { en: "View Services", bn: "সেবাসমূহ দেখুন" },
  { en: "Our Services", bn: "আমাদের সেবাসমূহ" },
  { en: "Food Delivery", bn: "ফুড ডেলিভারি" },
  { en: "Courier Delivery", bn: "কুরিয়ার ডেলিভারি" },
  { en: "Courier Service", bn: "কুরিয়ার সেবা" },
  { en: "Market", bn: "মার্কেটপ্লেস" },
  { en: "Marketplace", bn: "মার্কেটপ্লেস" },
  { en: "Mobility", bn: "যাতায়াত" },
  { en: "Technology", bn: "প্রযুক্তি" },
  { en: "Active Focus", bn: "সক্রিয় অগ্রাধিকার" },
  { en: "Active", bn: "সক্রিয়" },
  { en: "View all services", bn: "সব সেবা দেখুন" },
  { en: "Apps Ecosystem", bn: "অ্যাপ ইকোসিস্টেম" },
  { en: "Customer App", bn: "কাস্টমার অ্যাপ" },
  { en: "Partner App", bn: "পার্টনার অ্যাপ" },
  { en: "Rider App", bn: "রাইডার অ্যাপ" },
  { en: "Agent App", bn: "এজেন্ট অ্যাপ" },
  { en: "Administration", bn: "অ্যাডমিনিস্ট্রেশন" },
  { en: "Digital Wallet", bn: "ডিজিটাল ওয়ালেট" },
  { en: "Core", bn: "মূল সিস্টেম" },
  { en: "Future", bn: "ভবিষ্যৎ" },
  { en: "Planned", bn: "পরিকল্পনাধীন" },
  { en: "View all apps", bn: "সব অ্যাপ দেখুন" },
  { en: "News and product announcements from the Ride Bangla team.", bn: "Ride Bangla টিমের সংবাদ ও পণ্যসংক্রান্ত ঘোষণা।" },
  { en: "Loading latest updates...", bn: "সর্বশেষ আপডেট লোড হচ্ছে..." },
  { en: "No updates yet. Check back soon.", bn: "এখনো কোনো আপডেট নেই। পরে আবার দেখুন।" },
  { en: "Announcement", bn: "ঘোষণা" },
  { en: "Open Video", bn: "ভিডিও খুলুন" },
  { en: "Learn more", bn: "আরও জানুন" },
  { en: "Like", bn: "লাইক" },
  { en: "Comment", bn: "মন্তব্য" },
  { en: "Share", bn: "শেয়ার" },
  { en: "Copy link", bn: "লিংক কপি করুন" },
  { en: "Link copied", bn: "লিংক কপি হয়েছে" },
  { en: "Your name", bn: "আপনার নাম" },
  { en: "Email (optional)", bn: "ইমেইল (ঐচ্ছিক)" },
  { en: "Write a comment", bn: "মন্তব্য লিখুন" },
  { en: "Submit comment", bn: "মন্তব্য জমা দিন" },
  { en: "Submitting...", bn: "জমা হচ্ছে..." },
  { en: "Contact Us", bn: "যোগাযোগ করুন" },
  { en: "Send Message", bn: "বার্তা পাঠান" },
  { en: "Sending...", bn: "পাঠানো হচ্ছে..." },
  { en: "Name", bn: "নাম" },
  { en: "Email", bn: "ইমেইল" },
  { en: "Phone", bn: "ফোন" },
  { en: "Subject", bn: "বিষয়" },
  { en: "Message", bn: "বার্তা" },
  { en: "Required", bn: "আবশ্যক" },
  { en: "Leadership", bn: "নেতৃত্ব" },
  { en: "Meet the team behind Ride Bangla", bn: "Ride Bangla-এর পেছনের নেতৃত্বের সঙ্গে পরিচিত হন" },
  { en: "Co-Founder & CEO", bn: "সহ-প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা" },
  { en: "Chairman & Co-Founder", bn: "চেয়ারম্যান ও সহ-প্রতিষ্ঠাতা" },
  { en: "Mission", bn: "মিশন" },
  { en: "Vision", bn: "ভিশন" },
  { en: "Core Values", bn: "মূল মূল্যবোধ" },
  { en: "Connected Ecosystem", bn: "সংযুক্ত ইকোসিস্টেম" },
  { en: "One ecosystem, multiple connected systems", bn: "একটি ইকোসিস্টেম, একাধিক সংযুক্ত সিস্টেম" },
  { en: "Service Ecosystem", bn: "সেবা ইকোসিস্টেম" },
  { en: "Multiple services, one connected company", bn: "একাধিক সেবা, একটি সংযুক্ত প্রতিষ্ঠান" },
  { en: "Delivery", bn: "ডেলিভারি" },
  { en: "Official Communication", bn: "অফিশিয়াল যোগাযোগ" },
  { en: "Contact Ride Bangla through official channels only.", bn: "শুধু Ride Bangla-এর অফিসিয়াল মাধ্যমেই যোগাযোগ করুন।" },
  { en: "WhatsApp / Phone", bn: "WhatsApp / ফোন" },
  { en: "Frequently Asked Questions", bn: "সাধারণ জিজ্ঞাসা" },
  { en: "Search common questions about Ride Bangla services.", bn: "Ride Bangla-এর সেবা সম্পর্কে সাধারণ প্রশ্ন খুঁজুন।" },
  { en: "Search FAQs…", bn: "প্রশ্ন খুঁজুন…" },
  { en: "Search FAQs", bn: "প্রশ্ন খুঁজুন" },
  { en: "Contact Support", bn: "সাপোর্টে যোগাযোগ করুন" },
  { en: "Customer Support", bn: "কাস্টমার সাপোর্ট" },
  { en: "Official Channel", bn: "অফিশিয়াল মাধ্যম" },
  { en: "Partner & Rider Help", bn: "পার্টনার ও রাইডার সহায়তা" },
  { en: "Ask Ride Bangla AI", bn: "Ride Bangla AI-কে জিজ্ঞাসা করুন" },
  { en: "Still need help?", bn: "এখনও সাহায্য দরকার?" },
  { en: "WhatsApp Support", bn: "WhatsApp সাপোর্ট" },
  { en: "Quick Links", bn: "দ্রুত লিংক" },
  { en: "Support", bn: "সহায়তা" },
  { en: "Connect", bn: "যোগাযোগ" },
  { en: "Privacy Policy", bn: "গোপনীয়তা নীতি" },
  { en: "Terms and Conditions", bn: "শর্তাবলি" },
  { en: "Cookie Policy", bn: "কুকি নীতি" },
  { en: "Data Deletion", bn: "ডেটা মুছে ফেলা" },
  { en: "Delete Account", bn: "অ্যাকাউন্ট মুছুন" },
];

const byEnglish = new Map(translations.map((item) => [item.en, item]));
const byBangla = new Map(translations.map((item) => [item.bn, item]));
let translating = false;

function translateValue(value: string, language: Language) {
  const leading = value.match(/^\s*/)?.[0] ?? "";
  const trailing = value.match(/\s*$/)?.[0] ?? "";
  const trimmed = value.trim();
  if (!trimmed) return value;

  const pair = byEnglish.get(trimmed) ?? byBangla.get(trimmed);
  if (!pair) return value;
  return `${leading}${pair[language]}${trailing}`;
}

function translateTree(root: ParentNode, language: Language) {
  if (translating || typeof document === "undefined") return;
  translating = true;

  try {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;

    while ((node = walker.nextNode())) {
      const text = node as Text;
      const parent = text.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA"].includes(parent.tagName)) continue;

      const nextValue = translateValue(text.nodeValue ?? "", language);
      if (text.nodeValue !== nextValue) text.nodeValue = nextValue;
    }

    root.querySelectorAll?.("[placeholder],[aria-label],[title]").forEach((element) => {
      for (const attr of ["placeholder", "aria-label", "title"]) {
        const current = element.getAttribute(attr);
        if (!current) continue;
        const nextValue = translateValue(current, language);
        if (current !== nextValue) element.setAttribute(attr, nextValue);
      }
    });
  } finally {
    translating = false;
  }
}

export function PageTranslator() {
  const { language } = useLanguage();

  useEffect(() => {
    translateTree(document.body, language);

    let frame = 0;
    const observer = new MutationObserver(() => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => translateTree(document.body, language));
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["placeholder", "aria-label", "title"],
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [language]);

  return null;
}
