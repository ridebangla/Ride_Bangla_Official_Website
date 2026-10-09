import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Utensils, Package, Car, Store, Code2, ShoppingBasket, Pill, Palette, Search, Mail, ChefHat, UtensilsCrossed, Wallet, LayoutTemplate, Sparkles, Bot } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Services — Delivery, Food, Courier & IT Team" },
      {
        name: "description",
        content:
          "Ride Bangla offers ride sharing, food delivery, courier, grocery, medicine, marketplace and IT services like app development and digital marketing.",
      },
      { property: "og:title", content: "Services — Ride Bangla" },
      {
        property: "og:description",
        content:
          "Ride sharing, food delivery, courier, homemade food, restaurant food, grocery, medicine, marketplace and professional digital services — serving all of Bangladesh.",
      },
      { property: "og:url", content: "https://ridebangla.bd/services" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/services" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/services" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/services?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/services" },
    ],
  }),
  component: ServicesPage,
});

const copy = {
  en: {
    headerTitle: "Our Services",
    headerSubtitle:
      "Ride Bangla is a multi-service technology ecosystem serving customers, riders, partners, agents and businesses — head office in Faridpur, service across all 64 districts of Bangladesh.",
    rideSharingTitle: "Ride Sharing",
    rideSharingBody:
      "Technology-enabled transportation services connecting customers and registered riders.",
    homemadeFoodTitle: "Homemade Food",
    homemadeFoodBody:
      "Delivery of homemade meals, cakes and drinks from local home kitchens.",
    restaurantFoodTitle: "Restaurant Food",
    restaurantFoodBody:
      "Delivery service for restaurant meals and prepared food from partner restaurants.",
    foodDeliveryTitle: "Food Delivery",
    foodDeliveryBody:
      "Delivery services for restaurants, home kitchens, food businesses, drinks and prepared meals.",
    courierDeliveryTitle: "Courier Delivery",
    courierDeliveryBody:
      "Parcel, document and local delivery support for individuals, merchants and businesses.",
    marketplaceTitle: "Marketplace",
    marketplaceBody:
      "A connected marketplace for groceries, daily essentials, medicine and other products.",
    groceryEssentialsTitle: "Grocery & Essentials",
    groceryEssentialsBody:
      "Digital access to groceries and everyday household products through participating partners.",
    medicineTitle: "Medicine",
    medicineBody:
      "Marketplace support for medicine and health-related products through eligible businesses, subject to applicable requirements.",
    appWebDevTitle: "App & Web Development",
    appWebDevBody:
      "Professional mobile application and website development services through the Ride Bangla IT Team.",
    uiUxDesignTitle: "UI/UX Design",
    uiUxDesignBody:
      "User-friendly interface and experience design for apps, websites and digital products.",
    logoDesignTitle: "Logo Design",
    logoDesignBody:
      "Custom logo and brand mark design for businesses, personal brands and channels.",
    graphicDesignTitle: "Graphic Design",
    graphicDesignBody:
      "Branding, graphic design and visual identity services through the Ride Bangla IT Team.",
    channelBrandingTitle: "Channel Logo & Branding",
    channelBrandingBody:
      "Custom logo and profile branding design for YouTube, WhatsApp, Instagram and TikTok channels.",
    seoTitle: "SEO",
    seoBody:
      "Search engine optimization services to help businesses get discovered online.",
    emailMarketingTitle: "Email Marketing",
    emailMarketingBody:
      "Professional email marketing and business communication campaigns.",
    socialMediaMarketingTitle: "Social Media Marketing",
    socialMediaMarketingBody:
      "Facebook, YouTube, Instagram and TikTok marketing, content management and page growth.",
    chatbotSetupTitle: "Auto-Reply Chatbot Setup",
    chatbotSetupBody:
      "Automated auto-reply message systems for Messenger and WhatsApp to handle customer messages instantly.",
    itLogoAlt:
      "Ride Bangla IT Team — Apps, Web, Design, Digital Marketing",
    itTitle: "Ride Bangla IT Team (IT & Digital Services)",
    itBody:
      "The Ride Bangla IT Team provides professional app development, website development, UI/UX design, logo design, graphic design, channel branding, SEO, email marketing, social media marketing and automated auto-reply chatbot setup — a women-first IT initiative within the Ride Bangla ecosystem.",
    tags: [
      "App & Web Development",
      "UI/UX Design",
      "Logo Design",
      "Graphic Design",
      "Channel Branding",
      "SEO",
      "Email Marketing",
      "Social Media Marketing",
      "Auto-Reply Chatbot",
    ],
    visitIt: "Visit it.ridebangla.bd",
    ariaInstagram: "Ride Bangla Office on Instagram",
    ariaTiktok: "Ride Bangla Office on TikTok",
    futurePlansTitle: "Future Plans",
    futurePlansBody:
      "Additional products are planned as the ecosystem grows.",
    payTitle: "Ride Bangla Pay",
    payBody:
      "Our own upcoming digital wallet and payment service for customers, partners, riders and agents across the ecosystem.",
  },
  bn: {
    headerTitle: "আমাদের সেবাসমূহ",
    headerSubtitle:
      "Ride Bangla একটি মাল্টি-সার্ভিস টেকনোলজি ইকোসিস্টেম, যা কাস্টমার, রাইডার, পার্টনার, এজেন্ট ও ব্যবসাগুলোকে সেবা দেয় — ফরিদপুরে হেড অফিস, বাংলাদেশের সব ৬৪ জেলায় সেবা।",
    rideSharingTitle: "রাইড শেয়ারিং",
    rideSharingBody:
      "প্রযুক্তি-নির্ভর পরিবহন সেবা, যা কাস্টমার ও রেজিস্টার্ড রাইডারদের সংযুক্ত করে।",
    homemadeFoodTitle: "হোমমেড ফুড",
    homemadeFoodBody:
      "স্থানীয় হোম কিচেন থেকে ঘরোয়া খাবার, কেক ও পানীয় ডেলিভারি।",
    restaurantFoodTitle: "রেস্টুরেন্ট ফুড",
    restaurantFoodBody:
      "পার্টনার রেস্টুরেন্টগুলোর রেস্টুরেন্ট মিল ও প্রস্তুতকৃত খাবারের ডেলিভারি সেবা।",
    foodDeliveryTitle: "ফুড ডেলিভারি",
    foodDeliveryBody:
      "রেস্টুরেন্ট, হোম কিচেন, ফুড বিজনেস, পানীয় ও প্রস্তুতকৃত খাবারের ডেলিভারি সেবা।",
    courierDeliveryTitle: "কুরিয়ার ডেলিভারি",
    courierDeliveryBody:
      "ব্যক্তি, মার্চেন্ট ও ব্যবসার জন্য পার্সেল, ডকুমেন্ট ও স্থানীয় ডেলিভারি সহায়তা।",
    marketplaceTitle: "মার্কেটপ্লেস",
    marketplaceBody:
      "গ্রোসারি, দৈনন্দিন প্রয়োজনীয় পণ্য, ওষুধ ও অন্যান্য পণ্যের জন্য একটি সংযুক্ত মার্কেটপ্লেস।",
    groceryEssentialsTitle: "গ্রোসারি ও নিত্যপ্রয়োজনীয়",
    groceryEssentialsBody:
      "অংশগ্রহণকারী পার্টনারদের মাধ্যমে গ্রোসারি ও দৈনন্দিন গৃহস্থালি পণ্যের ডিজিটাল সুবিধা।",
    medicineTitle: "ওষুধ",
    medicineBody:
      "প্রযোজ্য নিয়মাবলী অনুযায়ী যোগ্য ব্যবসার মাধ্যমে ওষুধ ও স্বাস্থ্য-সম্পর্কিত পণ্যের মার্কেটপ্লেস সহায়তা।",
    appWebDevTitle: "অ্যাপ ও ওয়েব ডেভেলপমেন্ট",
    appWebDevBody:
      "Ride Bangla IT Team-এর মাধ্যমে পেশাদার মোবাইল অ্যাপ ও ওয়েবসাইট ডেভেলপমেন্ট সেবা।",
    uiUxDesignTitle: "UI/UX ডিজাইন",
    uiUxDesignBody:
      "অ্যাপ, ওয়েবসাইট ও ডিজিটাল পণ্যের জন্য ব্যবহারবান্ধব ইন্টারফেস ও এক্সপেরিয়েন্স ডিজাইন।",
    logoDesignTitle: "লোগো ডিজাইন",
    logoDesignBody:
      "ব্যবসা, ব্যক্তিগত ব্র্যান্ড ও চ্যানেলের জন্য কাস্টম লোগো ও ব্র্যান্ড মার্ক ডিজাইন।",
    graphicDesignTitle: "গ্রাফিক ডিজাইন",
    graphicDesignBody:
      "Ride Bangla IT Team-এর মাধ্যমে ব্র্যান্ডিং, গ্রাফিক ডিজাইন ও ভিজ্যুয়াল আইডেন্টিটি সেবা।",
    channelBrandingTitle: "চ্যানেল লোগো ও ব্র্যান্ডিং",
    channelBrandingBody:
      "YouTube, WhatsApp, Instagram ও TikTok চ্যানেলের জন্য কাস্টম লোগো ও প্রোফাইল ব্র্যান্ডিং ডিজাইন।",
    seoTitle: "SEO",
    seoBody:
      "ব্যবসাগুলোকে অনলাইনে খুঁজে পেতে সাহায্য করার জন্য সার্চ ইঞ্জিন অপটিমাইজেশন সেবা।",
    emailMarketingTitle: "ইমেইল মার্কেটিং",
    emailMarketingBody:
      "পেশাদার ইমেইল মার্কেটিং ও ব্যবসায়িক কমিউনিকেশন ক্যাম্পেইন।",
    socialMediaMarketingTitle: "সোশ্যাল মিডিয়া মার্কেটিং",
    socialMediaMarketingBody:
      "Facebook, YouTube, Instagram ও TikTok মার্কেটিং, কনটেন্ট ম্যানেজমেন্ট ও পেজ গ্রোথ।",
    chatbotSetupTitle: "অটো-রিপ্লাই চ্যাটবট সেটআপ",
    chatbotSetupBody:
      "কাস্টমার মেসেজ সঙ্গে সঙ্গে উত্তর দেওয়ার জন্য Messenger ও WhatsApp-এর অটোমেটেড অটো-রিপ্লাই মেসেজ সিস্টেম।",
    itLogoAlt:
      "Ride Bangla IT Team — অ্যাপ, ওয়েব, ডিজাইন, ডিজিটাল মার্কেটিং",
    itTitle: "Ride Bangla IT Team (IT ও ডিজিটাল সার্ভিস)",
    itBody:
      "Ride Bangla IT Team পেশাদার অ্যাপ ডেভেলপমেন্ট, ওয়েবসাইট ডেভেলপমেন্ট, UI/UX ডিজাইন, লোগো ডিজাইন, গ্রাফিক ডিজাইন, চ্যানেল ব্র্যান্ডিং, SEO, ইমেইল মার্কেটিং, সোশ্যাল মিডিয়া মার্কেটিং এবং অটোমেটেড অটো-রিপ্লাই চ্যাটবট সেটআপ দিয়ে থাকে — Ride Bangla ইকোসিস্টেমের একটি women-first IT উদ্যোগ।",
    tags: [
      "অ্যাপ ও ওয়েব ডেভেলপমেন্ট",
      "UI/UX ডিজাইন",
      "লোগো ডিজাইন",
      "গ্রাফিক ডিজাইন",
      "চ্যানেল ব্র্যান্ডিং",
      "SEO",
      "ইমেইল মার্কেটিং",
      "সোশ্যাল মিডিয়া মার্কেটিং",
      "অটো-রিপ্লাই চ্যাটবট",
    ],
    visitIt: "it.ridebangla.bd ভিজিট করুন",
    ariaInstagram: "ইনস্টাগ্রামে Ride Bangla অফিস",
    ariaTiktok: "টিকটকে Ride Bangla অফিস",
    futurePlansTitle: "ভবিষ্যৎ পরিকল্পনা",
    futurePlansBody:
      "ইকোসিস্টেম বৃদ্ধির সঙ্গে সঙ্গে আরও পণ্য আসার পরিকল্পনা রয়েছে।",
    payTitle: "Ride Bangla Pay",
    payBody:
      "ইকোসিস্টেমজুড়ে কাস্টমার, পার্টনার, রাইডার ও এজেন্টদের জন্য আমাদের নিজস্ব আসন্ন ডিজিটাল ওয়ালেট ও পেমেন্ট সেবা।",
  },
} as const;

function ServicesPage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  const services = useMemo(
    () => [
      { icon: <Car className="h-6 w-6" />, title: t.rideSharingTitle, body: t.rideSharingBody },
      { icon: <ChefHat className="h-6 w-6" />, title: t.homemadeFoodTitle, body: t.homemadeFoodBody },
      { icon: <UtensilsCrossed className="h-6 w-6" />, title: t.restaurantFoodTitle, body: t.restaurantFoodBody },
      { icon: <Utensils className="h-6 w-6" />, title: t.foodDeliveryTitle, body: t.foodDeliveryBody },
      { icon: <Package className="h-6 w-6" />, title: t.courierDeliveryTitle, body: t.courierDeliveryBody },
      { icon: <Store className="h-6 w-6" />, title: t.marketplaceTitle, body: t.marketplaceBody },
      { icon: <ShoppingBasket className="h-6 w-6" />, title: t.groceryEssentialsTitle, body: t.groceryEssentialsBody },
      { icon: <Pill className="h-6 w-6" />, title: t.medicineTitle, body: t.medicineBody },
      { icon: <Code2 className="h-6 w-6" />, title: t.appWebDevTitle, body: t.appWebDevBody },
      { icon: <LayoutTemplate className="h-6 w-6" />, title: t.uiUxDesignTitle, body: t.uiUxDesignBody },
      { icon: <Sparkles className="h-6 w-6" />, title: t.logoDesignTitle, body: t.logoDesignBody },
      { icon: <Palette className="h-6 w-6" />, title: t.graphicDesignTitle, body: t.graphicDesignBody },
      {
        icon: (
          <span className="flex items-center gap-1 text-brand-green">
            <FaYoutube className="h-4 w-4" />
            <FaWhatsapp className="h-4 w-4" />
            <FaInstagram className="h-4 w-4" />
            <FaTiktok className="h-4 w-4" />
          </span>
        ),
        title: t.channelBrandingTitle,
        body: t.channelBrandingBody,
      },
      { icon: <Search className="h-6 w-6" />, title: t.seoTitle, body: t.seoBody },
      { icon: <Mail className="h-6 w-6" />, title: t.emailMarketingTitle, body: t.emailMarketingBody },
      {
        icon: (
          <span className="flex items-center gap-1 text-brand-green">
            <FaFacebook className="h-4 w-4" />
            <FaYoutube className="h-4 w-4" />
            <FaInstagram className="h-4 w-4" />
            <FaTiktok className="h-4 w-4" />
          </span>
        ),
        title: t.socialMediaMarketingTitle,
        body: t.socialMediaMarketingBody,
      },
      { icon: <Bot className="h-6 w-6" />, title: t.chatbotSetupTitle, body: t.chatbotSetupBody },
    ],
    [t]
  );

  const futurePlans = useMemo(
    () => [
      { icon: <Wallet className="h-6 w-6" />, title: t.payTitle, body: t.payBody },
    ],
    [t]
  );

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
      />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
                {service.icon}
              </div>
              <h2 className="mt-4 text-lg font-semibold">{service.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-brand-green/20 bg-brand-green-soft/40 p-6">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <img
              src="/assets/brand/ride-bangla-it-logo.jpg"
              alt={t.itLogoAlt}
              className="h-24 w-24 shrink-0 rounded-2xl border border-white bg-white object-contain p-1.5 shadow-sm sm:h-28 sm:w-28"
            />
            <div>
              <h2 className="text-xl font-bold">{t.itTitle}</h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
                {t.itBody}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {t.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-brand-green/20 bg-white px-3 py-1.5 text-xs font-bold text-brand-green">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a href="https://it.ridebangla.bd" target="_blank" rel="noreferrer noopener" className="inline-flex rounded-xl bg-brand-green px-4 py-3 text-sm font-semibold text-white">
              {t.visitIt}
            </a>
            <a
              href="https://www.instagram.com/ride.bangla_"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={t.ariaInstagram}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-brand-green shadow-sm ring-1 ring-brand-green/15 transition hover:-translate-y-1 hover:bg-brand-green hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@ridebangla0"
              target="_blank"
              rel="noreferrer noopener"
              aria-label={t.ariaTiktok}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-brand-green shadow-sm ring-1 ring-brand-green/15 transition hover:-translate-y-1 hover:bg-brand-green hover:text-white"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-extrabold tracking-tight">{t.futurePlansTitle}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted-foreground">
            {t.futurePlansBody}
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {futurePlans.map((item) => (
              <article key={item.title} className="rounded-2xl border border-dashed border-brand-green/30 bg-card p-6 shadow-sm">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
