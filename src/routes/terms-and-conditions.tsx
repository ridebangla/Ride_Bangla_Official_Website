import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/terms-and-conditions")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Ride Bangla" },
      {
        name: "description",
        content:
          "Read the Ride Bangla Terms and Conditions for our website, mobile apps, ride sharing, food delivery, courier and digital services across Bangladesh.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/terms-and-conditions" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/terms-and-conditions" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/terms-and-conditions?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/terms-and-conditions" },
    ],
  }),
  component: TermsPage,
});

const copy = {
  en: {
    headerTitle: "Terms & Conditions",
    headerSubtitle: "Last updated: June 2026",
    sections: [
      {
        heading: "1. Acceptance of Terms",
        body: "By accessing or using the Ride Bangla website, apps, forms, content or digital services, you agree to these Terms & Conditions. If you do not agree, please do not use our website or services.",
      },
      {
        heading: "2. About Ride Bangla",
        body: "Ride Bangla is a Bangladesh-based digital service platform founded in Faridpur, Bangladesh. Our current operational focus is Food Delivery and Courier services, supported by Customer, Partner, Rider and Admin systems. Other services such as Market, Ride Sharing, Wallet and Agent services may be introduced gradually.",
      },
      {
        heading: "3. Use of the Website",
        body: "You agree to use this website lawfully, respectfully and only for its intended purpose. You must not attempt to disrupt the service, misuse forms, submit false information, scrape content automatically, upload harmful content or interfere with website security.",
      },
      {
        heading: "4. Website Information",
        body: "We try to keep information accurate and updated, but website content, service availability, app availability, features, prices, offers, policies and launch timelines may change without prior notice.",
      },
      {
        heading: "5. Services and App Availability",
        body: "Food Delivery and Courier services may depend on location, partner availability, rider availability, business hours, weather, traffic, operational capacity and other practical conditions. Future services displayed on the website may be identified as planned and may not be available immediately.",
      },
      {
        heading: "6. Partner, Rider and Business Requests",
        body: "Submitting a rider, partner, business or support request does not guarantee approval, onboarding or service activation. Ride Bangla may review, accept, reject or request additional information according to internal policies and operational requirements.",
      },
      {
        heading: "7. User Submitted Information",
        body: "You are responsible for ensuring that information you submit through forms, messages, comments or support requests is accurate, lawful and does not violate another person's rights. We may remove or ignore abusive, misleading, spam or unlawful submissions.",
      },
      {
        heading: "8. Comments and Public Interaction",
        body: "If comments, likes or public interaction features are available, Ride Bangla may moderate, approve, reject or remove content that is spam, abusive, misleading, illegal, promotional or harmful to users, partners, riders or the company.",
      },
      {
        heading: "9. Content and Intellectual Property",
        body: "Ride Bangla branding, logos, names, text, graphics, photos, videos, website design and other content are owned by Ride Bangla or used with permission unless otherwise stated. You may not copy, reproduce, modify, sell, publish or use our content or brand assets without prior written permission.",
      },
      {
        heading: "10. Third-Party Links",
        body: "Our website may contain links to third-party websites, social media pages, maps, payment providers, app stores or advertising partners. We are not responsible for the content, privacy practices, accuracy or policies of third-party websites.",
      },
      {
        heading: "11. Advertising and Sponsored Content",
        body: "Ride Bangla may display advertisements, sponsored content or third-party ad services such as Google AdSense in the future. Ads do not mean Ride Bangla endorses every advertiser, product or service. Advertising partners may have their own terms and privacy policies.",
      },
      {
        heading: "12. No Guarantee",
        body: 'The website is provided on an "as is" and "as available" basis. We do not guarantee that the website will always be uninterrupted, error-free, secure or available at all times.',
      },
      {
        heading: "13. Limitation of Liability",
        body: "To the maximum extent permitted by applicable law, Ride Bangla is not liable for indirect, incidental, special, consequential or business losses arising from use of the website, inability to use the website, third-party links, delayed updates or information errors.",
      },
      {
        heading: "14. Privacy",
        body: "Your use of our website and services is also governed by our Privacy Policy and Cookie Policy. Please review those pages to understand how we collect, use and protect information.",
      },
      {
        heading: "15. Changes to Terms",
        body: 'We may update these Terms & Conditions from time to time. The updated version will be posted on this page with a revised "Last updated" date. Continued use of the website means you accept the updated terms.',
      },
      {
        heading: "16. Governing Law",
        body: "These Terms & Conditions are intended to be governed by the applicable laws of Bangladesh. Any dispute should first be resolved through official communication with Ride Bangla.",
      },
    ],
    contactHeading: "17. Contact",
    contactLead:
      "Questions about these terms? Contact Ride Bangla, Faridpur, Bangladesh",
  },
  bn: {
    headerTitle: "শর্তাবলী",
    headerSubtitle: "সর্বশেষ হালনাগাদ: জুন ২০২৬",
    sections: [
      {
        heading: "১. শর্তাবলী গ্রহণ",
        body: "Ride Bangla ওয়েবসাইট, অ্যাপ, ফর্ম, কনটেন্ট বা ডিজিটাল সেবা ব্যবহারের মাধ্যমে আপনি এই শর্তাবলীতে সম্মত হচ্ছেন। আপনি সম্মত না হলে অনুগ্রহ করে আমাদের ওয়েবসাইট বা সেবা ব্যবহার করবেন না।",
      },
      {
        heading: "২. Ride Bangla সম্পর্কে",
        body: "Ride Bangla বাংলাদেশভিত্তিক একটি ডিজিটাল সেবা প্ল্যাটফর্ম, যা ফরিদপুর, বাংলাদেশে প্রতিষ্ঠিত। বর্তমানে আমাদের প্রধান কার্যক্রম ফুড ডেলিভারি ও কুরিয়ার সেবা, যা কাস্টমার, পার্টনার, রাইডার ও অ্যাডমিন সিস্টেম দ্বারা পরিচালিত। মার্কেট, রাইড শেয়ারিং, ওয়ালেট ও এজেন্ট সেবার মতো অন্যান্য সেবা ধীরে ধীরে চালু করা হতে পারে।",
      },
      {
        heading: "৩. ওয়েবসাইট ব্যবহার",
        body: "আপনি এই ওয়েবসাইটটি আইনসম্মতভাবে, সম্মানজনকভাবে এবং শুধুমাত্র নির্ধারিত উদ্দেশ্যে ব্যবহার করতে সম্মত হচ্ছেন। আপনি সেবা ব্যাহত করার চেষ্টা, ফর্মের অপব্যবহার, ভুয়া তথ্য জমা, স্বয়ংক্রিয়ভাবে কনটেন্ট স্ক্র্যাপ, ক্ষতিকর কনটেন্ট আপলোড বা ওয়েবসাইটের নিরাপত্তায় হস্তক্ষেপ করতে পারবেন না।",
      },
      {
        heading: "৪. ওয়েবসাইটের তথ্য",
        body: "আমরা তথ্য সঠিক ও হালনাগাদ রাখার চেষ্টা করি, তবে ওয়েবসাইটের কনটেন্ট, সেবার প্রাপ্যতা, অ্যাপের প্রাপ্যতা, ফিচার, দাম, অফার, নীতিমালা ও চালুর সময়সূচি পূর্ব ঘোষণা ছাড়াই পরিবর্তিত হতে পারে।",
      },
      {
        heading: "৫. সেবা ও অ্যাপের প্রাপ্যতা",
        body: "ফুড ডেলিভারি ও কুরিয়ার সেবা অবস্থান, পার্টনারের প্রাপ্যতা, রাইডারের প্রাপ্যতা, ব্যবসায়িক সময়, আবহাওয়া, যানজট, পরিচালন সক্ষমতা ও অন্যান্য ব্যবহারিক শর্তের উপর নির্ভর করতে পারে। ওয়েবসাইটে প্রদর্শিত ভবিষ্যৎ সেবাগুলো পরিকল্পিত হিসেবে চিহ্নিত হতে পারে এবং তাৎক্ষণিকভাবে উপলব্ধ নাও হতে পারে।",
      },
      {
        heading: "৬. পার্টনার, রাইডার ও ব্যবসায়িক অনুরোধ",
        body: "রাইডার, পার্টনার, ব্যবসায়িক বা সহায়তা অনুরোধ জমা দিলে অনুমোদন, অনবোর্ডিং বা সেবা চালুর নিশ্চয়তা দেয় না। Ride Bangla অভ্যন্তরীণ নীতিমালা ও পরিচালন প্রয়োজন অনুযায়ী অনুরোধ পর্যালোচনা, গ্রহণ, প্রত্যাখ্যান বা অতিরিক্ত তথ্য চাইতে পারে।",
      },
      {
        heading: "৭. ব্যবহারকারীর জমা দেওয়া তথ্য",
        body: "ফর্ম, বার্তা, মন্তব্য বা সহায়তা অনুরোধের মাধ্যমে আপনি যে তথ্য জমা দেন তা সঠিক, আইনসম্মত এবং অন্য কারো অধিকার লঙ্ঘন করে না — তা নিশ্চিত করা আপনার দায়িত্ব। অপমানজনক, বিভ্রান্তিকর, স্প্যাম বা অবৈধ জমা আমরা মুছে দিতে বা উপেক্ষা করতে পারি।",
      },
      {
        heading: "৮. মন্তব্য ও পাবলিক ইন্টারঅ্যাকশন",
        body: "মন্তব্য, লাইক বা পাবলিক ইন্টারঅ্যাকশন ফিচার উপলব্ধ থাকলে, Ride Bangla স্প্যাম, অপমানজনক, বিভ্রান্তিকর, অবৈধ, প্রচারণামূলক বা ব্যবহারকারী, পার্টনার, রাইডার বা কোম্পানির জন্য ক্ষতিকর কনটেন্ট মডারেট, অনুমোদন, প্রত্যাখ্যান বা মুছে দিতে পারে।",
      },
      {
        heading: "৯. কনটেন্ট ও মেধাস্বত্ব",
        body: "Ride Bangla ব্র্যান্ডিং, লোগো, নাম, টেক্সট, গ্রাফিক্স, ছবি, ভিডিও, ওয়েবসাইট ডিজাইন ও অন্যান্য কনটেন্ট Ride Bangla-এর মালিকানাধীন অথবা অনুমতি নিয়ে ব্যবহৃত, যদি না অন্যভাবে উল্লেখ থাকে। পূর্ব লিখিত অনুমতি ছাড়া আপনি আমাদের কনটেন্ট বা ব্র্যান্ড সম্পদ অনুলিপি, পুনরুত্পাদন, পরিবর্তন, বিক্রি, প্রকাশ বা ব্যবহার করতে পারবেন না।",
      },
      {
        heading: "১০. তৃতীয় পক্ষের লিংক",
        body: "আমাদের ওয়েবসাইটে তৃতীয় পক্ষের ওয়েবসাইট, সোশ্যাল মিডিয়া পেজ, ম্যাপ, পেমেন্ট প্রদানকারী, অ্যাপ স্টোর বা বিজ্ঞাপন পার্টনারের লিংক থাকতে পারে। তৃতীয় পক্ষের ওয়েবসাইটের কনটেন্ট, গোপনীয়তা চর্চা, নির্ভুলতা বা নীতিমালার জন্য আমরা দায়ী নই।",
      },
      {
        heading: "১১. বিজ্ঞাপন ও স্পনসরড কনটেন্ট",
        body: "Ride Bangla ভবিষ্যতে বিজ্ঞাপন, স্পনসরড কনটেন্ট বা Google AdSense-এর মতো তৃতীয় পক্ষের বিজ্ঞাপন সেবা প্রদর্শন করতে পারে। বিজ্ঞাপন মানেই এই নয় যে Ride Bangla প্রতিটি বিজ্ঞাপনদাতা, পণ্য বা সেবাকে সমর্থন করে। বিজ্ঞাপন পার্টনারদের নিজস্ব শর্তাবলী ও গোপনীয়তা নীতিমালা থাকতে পারে।",
      },
      {
        heading: "১২. কোনো গ্যারান্টি নেই",
        body: "ওয়েবসাইটটি “যেমন আছে” এবং “যেমন উপলব্ধ” ভিত্তিতে প্রদান করা হয়। ওয়েবসাইট সবসময় নিরবচ্ছিন্ন, ত্রুটিমুক্ত, নিরাপদ বা সবসময় উপলব্ধ থাকবে — এমন কোনো গ্যারান্টি আমরা দিই না।",
      },
      {
        heading: "১৩. দায়বদ্ধতার সীমাবদ্ধতা",
        body: "প্রযোজ্য আইন অনুযায়ী সর্বোচ্চ সীমা পর্যন্ত, ওয়েবসাইট ব্যবহার, ওয়েবসাইট ব্যবহারে অক্ষমতা, তৃতীয় পক্ষের লিংক, বিলম্বিত হালনাগাদ বা তথ্যের ত্রুটি থেকে উদ্ভূত পরোক্ষ, আনুষঙ্গিক, বিশেষ, ফলস্বরূপ বা ব্যবসায়িক ক্ষতির জন্য Ride Bangla দায়ী নয়।",
      },
      {
        heading: "১৪. গোপনীয়তা",
        body: "আমাদের ওয়েবসাইট ও সেবার ব্যবহার আমাদের গোপনীয়তা নীতি (Privacy Policy) ও কুকি নীতিমালা (Cookie Policy) দ্বারাও নিয়ন্ত্রিত। আমরা কীভাবে তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষা করি তা জানতে অনুগ্রহ করে সেই পৃষ্ঠাগুলো দেখুন।",
      },
      {
        heading: "১৫. শর্তাবলীর পরিবর্তন",
        body: "আমরা সময়ে সময়ে এই শর্তাবলী হালনাগাদ করতে পারি। সংশোধিত “সর্বশেষ হালনাগাদ” তারিখসহ হালনাগাদ সংস্করণ এই পৃষ্ঠায় প্রকাশ করা হবে। ওয়েবসাইটের অব্যাহত ব্যবহার মানেই আপনি হালনাগাদ শর্ত মেনে নিয়েছেন।",
      },
      {
        heading: "১৬. প্রযোজ্য আইন",
        body: "এই শর্তাবলী বাংলাদেশের প্রযোজ্য আইন দ্বারা পরিচালিত হবে বলে অভিপ্রায় করা হয়েছে। যেকোনো বিরোধ প্রথমে Ride Bangla-এর সাথে অফিসিয়াল যোগাযোগের মাধ্যমে সমাধান করা উচিত।",
      },
    ],
    contactHeading: "১৭. যোগাযোগ",
    contactLead:
      "এই শর্তাবলী সম্পর্কে প্রশ্ন আছে? Ride Bangla, ফরিদপুর, বাংলাদেশ-এর সাথে যোগাযোগ করুন",
  },
} as const;

function TermsPage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
      />

      <article className="prose prose-sm mx-auto max-w-3xl px-4 py-10 text-foreground">
        {t.sections.map((section, index) => (
          <div key={index}>
            <h2
              className={
                index === 0
                  ? "mt-0 text-lg font-semibold"
                  : "mt-6 text-lg font-semibold"
              }
            >
              {section.heading}
            </h2>
            <p className="text-sm text-muted-foreground">{section.body}</p>
          </div>
        ))}

        <h2 className="mt-6 text-lg font-semibold">{t.contactHeading}</h2>
        <p className="text-sm text-muted-foreground">
          {t.contactLead} ·{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:info@ridebangla.bd"
          >
            info@ridebangla.bd
          </a>{" "}
          ·{" "}
          <a
            className="text-brand-green hover:underline"
            href="mailto:support@ridebangla.bd"
          >
            support@ridebangla.bd
          </a>
        </p>
      </article>
    </SiteLayout>
  );
}
