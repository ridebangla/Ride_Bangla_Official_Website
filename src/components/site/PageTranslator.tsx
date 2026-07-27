import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const bn: Record<string, string> = {
  "Page not found": "পৃষ্ঠা পাওয়া যায়নি",
  "The page you're looking for doesn't exist or has been moved.": "আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি নেই অথবা স্থানান্তর করা হয়েছে।",
  "Go home": "হোমে ফিরে যান",
  "This page didn't load": "এই পৃষ্ঠাটি লোড হয়নি",
  "Something went wrong on our end. You can try refreshing or head back home.": "আমাদের দিকে একটি সমস্যা হয়েছে। পৃষ্ঠাটি রিফ্রেশ করুন অথবা হোমে ফিরে যান।",
  "Try again": "আবার চেষ্টা করুন",
  "Latest Update": "সর্বশেষ আপডেট",
  "Read More": "বিস্তারিত পড়ুন",
  "Email for updates": "আপডেট পেতে ইমেইল",
  "Notify Me": "আমাকে জানাও",
  "Saving...": "সংরক্ষণ হচ্ছে...",
  "Explore Our Apps": "আমাদের অ্যাপ দেখুন",
  "View Services": "সেবাসমূহ দেখুন",
  "Our Services": "আমাদের সেবাসমূহ",
  "Food Delivery": "ফুড ডেলিভারি",
  "Courier Delivery": "কুরিয়ার ডেলিভারি",
  "Market": "মার্কেটপ্লেস",
  "Active Focus": "সক্রিয় অগ্রাধিকার",
  "Active": "সক্রিয়",
  "View all services": "সব সেবা দেখুন",
  "Apps Ecosystem": "অ্যাপ ইকোসিস্টেম",
  "Customer App": "কাস্টমার অ্যাপ",
  "Partner App": "পার্টনার অ্যাপ",
  "Rider App": "রাইডার অ্যাপ",
  "Agent App": "এজেন্ট অ্যাপ",
  "Administration": "অ্যাডমিনিস্ট্রেশন",
  "Digital Wallet": "ডিজিটাল ওয়ালেট",
  "Core": "মূল সিস্টেম",
  "Future": "ভবিষ্যৎ",
  "Planned": "পরিকল্পনাধীন",
  "View all apps": "সব অ্যাপ দেখুন",
  "Updates": "আপডেট",
  "News and product announcements from the Ride Bangla team.": "Ride Bangla টিমের সংবাদ ও পণ্যসংক্রান্ত ঘোষণা।",
  "Loading latest updates...": "সর্বশেষ আপডেট লোড হচ্ছে...",
  "No updates yet. Check back soon.": "এখনো কোনো আপডেট নেই। পরে আবার দেখুন।",
  "Announcement": "ঘোষণা",
  "Open Video": "ভিডিও খুলুন",
  "Learn more": "আরও জানুন",
  "Like": "লাইক",
  "Comment": "মন্তব্য",
  "Share": "শেয়ার",
  "Copy link": "লিংক কপি করুন",
  "Link copied": "লিংক কপি হয়েছে",
  "Your name": "আপনার নাম",
  "Email (optional)": "ইমেইল (ঐচ্ছিক)",
  "Write a comment": "মন্তব্য লিখুন",
  "Submit comment": "মন্তব্য জমা দিন",
  "Submitting...": "জমা হচ্ছে...",
  "About Ride Bangla": "Ride Bangla সম্পর্কে",
  "Services": "সেবাসমূহ",
  "Apps": "অ্যাপসমূহ",
  "Contact": "যোগাযোগ",
  "Help Center": "সহায়তা কেন্দ্র",
  "Privacy Policy": "গোপনীয়তা নীতি",
  "Terms and Conditions": "শর্তাবলি",
  "Cookie Policy": "কুকি নীতি",
  "Data Deletion": "ডেটা মুছে ফেলা",
  "Delete Account": "অ্যাকাউন্ট মুছুন",
  "Contact Us": "যোগাযোগ করুন",
  "Send Message": "বার্তা পাঠান",
  "Sending...": "পাঠানো হচ্ছে...",
  "Name": "নাম",
  "Email": "ইমেইল",
  "Phone": "ফোন",
  "Subject": "বিষয়",
  "Message": "বার্তা",
  "Required": "আবশ্যক",
  "Leadership": "নেতৃত্ব",
  "Co-Founder & CEO": "সহ-প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা",
  "Chairman & Co-Founder": "চেয়ারম্যান ও সহ-প্রতিষ্ঠাতা",
  "Frequently Asked Questions": "সাধারণ জিজ্ঞাসা",
  "Quick Links": "দ্রুত লিংক",
  "Support": "সহায়তা",
  "Connect": "যোগাযোগ",
};

const originals = new WeakMap<Text, string>();
const attrOriginals = new WeakMap<Element, Map<string, string>>();
let translating = false;

function translateTree(root: ParentNode, language: "en" | "bn") {
  if (translating) return;
  translating = true;
  try {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      const text = node as Text;
      const parent = text.parentElement;
      if (!parent || ["SCRIPT", "STYLE", "CODE", "PRE", "TEXTAREA"].includes(parent.tagName)) continue;
      if (!originals.has(text)) originals.set(text, text.nodeValue || "");
      const original = originals.get(text) || "";
      const trimmed = original.trim();
      const translated = bn[trimmed];
      const nextValue = language === "bn" && translated
        ? `${original.match(/^\s*/)?.[0] || ""}${translated}${original.match(/\s*$/)?.[0] || ""}`
        : original;
      if (text.nodeValue !== nextValue) text.nodeValue = nextValue;
    }

    root.querySelectorAll?.("[placeholder],[aria-label],[title]").forEach((element) => {
      const map = attrOriginals.get(element) || new Map<string, string>();
      for (const attr of ["placeholder", "aria-label", "title"]) {
        const current = element.getAttribute(attr);
        if (!current) continue;
        if (!map.has(attr)) map.set(attr, current);
        const original = map.get(attr)!;
        const nextValue = language === "bn" ? bn[original] || original : original;
        if (current !== nextValue) element.setAttribute(attr, nextValue);
      }
      attrOriginals.set(element, map);
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
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [language]);

  return null;
}
