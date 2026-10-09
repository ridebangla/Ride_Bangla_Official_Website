import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  CheckCircle2,
  Clock,
  ExternalLink,
  Facebook,
  Globe,
  Headphones,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Youtube,
} from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { submitWebsiteContact } from "@/lib/website-data";
import { Logo } from "@/components/site/Logo";
import { useLanguage } from "@/context/LanguageContext";

import { OFFICIAL_CONTACT } from "@/lib/official-contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Ride Bangla — Support, Riders, Partners & Business" },
      {
        name: "description",
        content:
          "Contact Ride Bangla for customer support, rider help, partner inquiries and business — via website, email, phone, WhatsApp and official social media channels.",
      },
      { property: "og:title", content: "Contact — Ride Bangla" },
      {
        property: "og:description",
        content:
          "Official Ride Bangla support for customers, riders, partners and businesses.",
      },
      { property: "og:url", content: "https://ridebangla.bd/contact" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/contact" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/contact" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/contact?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/contact" },
    ],
  }),
  component: ContactPage,
});

type FormValues = {
  name: string;
  phone: string;
  email: string;
  department: string;
  subject: string;
  message: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  email: "",
  department: "General Support",
  subject: "",
  message: "",
};

const copy = {
  en: {
    heroEyebrow: "Contact Ride Bangla",
    heroTitle: "We are here to help",
    heroBody:
      "Connect with Ride Bangla through our official website, email, support, phone, WhatsApp and social media channels.",
    titleOfficialWebsite: "Official Website",
    typeOpenWebsite: "Open Website",
    titleOfficialEmail: "Official Email",
    typeSendEmail: "Send Email",
    titleSupportEmail: "Support Email",
    typeGetSupport: "Get Support",
    titlePhone: "Phone",
    typeCallNow: "Call Now",
    titleWhatsApp: "WhatsApp",
    typeChatOnWhatsApp: "Chat on WhatsApp",
    titleFacebook: "Facebook",
    titleInstagram: "Instagram",
    titleYouTube: "YouTube",
    titleTikTok: "TikTok",
    titleXTwitter: "X / Twitter",
    typeFollowUs: "Follow Us",
    typeSubscribe: "Subscribe",
    typeFollowCeo: "Follow CEO",
    titleLocation: "Location",
    typeViewMap: "View Map",
    addressLabel:
      "Faridpur, Bangladesh (Head Office) — Serving All 64 Districts of Bangladesh",
    formEyebrow: "Send Message",
    formTitle: "Contact our support team",
    formBody:
      "Fill out this form and your message will go directly to the Ride Bangla admin support team.",
    channelsTitle: "Official response channels",
    channelsBody:
      "Support team can review your message from the admin panel and contact you by email, phone or WhatsApp.",
    routingTitle: "Support routing",
    routingBody:
      "Messages are routed to the appropriate Ride Bangla support, operations, partnership or technical team based on the selected department and subject.",
    browseHelp: "Browse Help Center",
    labelName: "Full Name",
    phName: "Your full name",
    labelPhone: "Phone / WhatsApp",
    phPhone: "+880 1XXX-XXXXXX",
    labelEmail: "Email",
    phEmail: "you@example.com",
    labelDepartment: "Department",
    labelSubject: "Subject",
    phSubject: "How can we help?",
    labelMessage: "Message",
    phMessage: "Write your message here...",
    deptGeneral: "General Support",
    deptFood: "Food Delivery",
    deptCourier: "Courier Service",
    deptRider: "Rider Support",
    deptPartner: "Partner Support",
    deptBusiness: "Business Partnership",
    deptTechnical: "Technical Issue",
    deptWebApp: "Website / App Issue",
    submitSending: "Sending...",
    submitSend: "Send Message",
    errorRequired: "Please fill in your name, email and message.",
    errorGeneric: "Could not send message. Please try again.",
    successBody:
      "Message sent successfully. Our support team will contact you as soon as possible.",
    supportEyebrow: "Official Support",
    supportTitle: "Need help with Ride Bangla?",
    supportBody:
      "For Food Delivery, Courier, partnership, rider, partner, support or business communication, please contact us through our official channels only.",
    emailSupport: "Email Support",
    whatsappButton: "WhatsApp",
  },
  bn: {
    heroEyebrow: "Ride Bangla-এর সঙ্গে যোগাযোগ",
    heroTitle: "আমরা সাহায্যের জন্য এখানে আছি",
    heroBody:
      "অফিসিয়াল ওয়েবসাইট, ইমেইল, সাপোর্ট, ফোন, WhatsApp ও সোশ্যাল মিডিয়া চ্যানেলের মাধ্যমে Ride Bangla-এর সঙ্গে যুক্ত হোন।",
    titleOfficialWebsite: "অফিসিয়াল ওয়েবসাইট",
    typeOpenWebsite: "ওয়েবসাইট খুলুন",
    titleOfficialEmail: "অফিসিয়াল ইমেইল",
    typeSendEmail: "ইমেইল পাঠান",
    titleSupportEmail: "সাপোর্ট ইমেইল",
    typeGetSupport: "সাপোর্ট নিন",
    titlePhone: "ফোন",
    typeCallNow: "এখনই কল করুন",
    titleWhatsApp: "WhatsApp",
    typeChatOnWhatsApp: "WhatsApp-এ চ্যাট করুন",
    titleFacebook: "Facebook",
    titleInstagram: "Instagram",
    titleYouTube: "YouTube",
    titleTikTok: "TikTok",
    titleXTwitter: "X / Twitter",
    typeFollowUs: "ফলো করুন",
    typeSubscribe: "সাবস্ক্রাইব করুন",
    typeFollowCeo: "CEO-কে ফলো করুন",
    titleLocation: "অবস্থান",
    typeViewMap: "ম্যাপ দেখুন",
    addressLabel:
      "ফরিদপুর, বাংলাদেশ (হেড অফিস) — বাংলাদেশের সব ৬৪ জেলায় সেবা",
    formEyebrow: "মেসেজ পাঠান",
    formTitle: "আমাদের সাপোর্ট টিমের সঙ্গে যোগাযোগ করুন",
    formBody:
      "এই ফর্মটি পূরণ করুন — আপনার মেসেজ সরাসরি Ride Bangla অ্যাডমিন সাপোর্ট টিমের কাছে পৌঁছাবে।",
    channelsTitle: "অফিসিয়াল রেসপন্স চ্যানেল",
    channelsBody:
      "সাপোর্ট টিম অ্যাডমিন প্যানেল থেকে আপনার মেসেজ দেখে ইমেইল, ফোন বা WhatsApp-এর মাধ্যমে আপনার সঙ্গে যোগাযোগ করতে পারবে।",
    routingTitle: "সাপোর্ট রাউটিং",
    routingBody:
      "নির্বাচিত ডিপার্টমেন্ট ও সাবজেক্ট অনুযায়ী মেসেজগুলো যথাযথ Ride Bangla সাপোর্ট, অপারেশন, পার্টনারশিপ বা টেকনিক্যাল টিমের কাছে পাঠানো হয়।",
    browseHelp: "হেল্প সেন্টার দেখুন",
    labelName: "পুরো নাম",
    phName: "আপনার পুরো নাম",
    labelPhone: "ফোন / WhatsApp",
    phPhone: "+880 1XXX-XXXXXX",
    labelEmail: "ইমেইল",
    phEmail: "you@example.com",
    labelDepartment: "ডিপার্টমেন্ট",
    labelSubject: "সাবজেক্ট",
    phSubject: "আমরা কীভাবে সাহায্য করতে পারি?",
    labelMessage: "মেসেজ",
    phMessage: "আপনার মেসেজ এখানে লিখুন...",
    deptGeneral: "জেনারেল সাপোর্ট",
    deptFood: "ফুড ডেলিভারি",
    deptCourier: "কুরিয়ার সার্ভিস",
    deptRider: "রাইডার সাপোর্ট",
    deptPartner: "পার্টনার সাপোর্ট",
    deptBusiness: "বিজনেস পার্টনারশিপ",
    deptTechnical: "টেকনিক্যাল সমস্যা",
    deptWebApp: "ওয়েবসাইট / অ্যাপ সমস্যা",
    submitSending: "পাঠানো হচ্ছে...",
    submitSend: "মেসেজ পাঠান",
    errorRequired: "আপনার নাম, ইমেইল ও মেসেজ লিখুন।",
    errorGeneric: "মেসেজ পাঠানো যায়নি। আবার চেষ্টা করুন।",
    successBody:
      "মেসেজ সফলভাবে পাঠানো হয়েছে। আমাদের সাপোর্ট টিম যত তাড়াতাড়ি সম্ভব আপনার সঙ্গে যোগাযোগ করবে।",
    supportEyebrow: "অফিসিয়াল সাপোর্ট",
    supportTitle: "Ride Bangla নিয়ে সাহায্য দরকার?",
    supportBody:
      "ফুড ডেলিভারি, কুরিয়ার, পার্টনারশিপ, রাইডার, পার্টনার, সাপোর্ট বা বিজনেস যোগাযোগের জন্য শুধুমাত্র আমাদের অফিসিয়াল চ্যানেলের মাধ্যমে যোগাযোগ করুন।",
    emailSupport: "ইমেইল সাপোর্ট",
    whatsappButton: "WhatsApp",
  },
} as const;

function ContactPage() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [formError, setFormError] = useState("");
  const businessEmail = "info@ridebangla.bd";
  const supportEmail = "support@ridebangla.bd";
  const phone = OFFICIAL_CONTACT.phone;
  const whatsapp = OFFICIAL_CONTACT.whatsapp;
  const address = "Faridpur, Bangladesh";
  const addressLabel = t.addressLabel;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const contacts = [
    {
      title: t.titleOfficialWebsite,
      value: "ridebangla.bd",
      href: "https://ridebangla.bd",
      icon: Globe,
      type: t.typeOpenWebsite,
    },
    {
      title: t.titleOfficialEmail,
      value: businessEmail,
      href: `mailto:${businessEmail}`,
      icon: Mail,
      type: t.typeSendEmail,
    },
    {
      title: t.titleSupportEmail,
      value: supportEmail,
      href: `mailto:${supportEmail}`,
      icon: Headphones,
      type: t.typeGetSupport,
    },
    {
      title: t.titlePhone,
      value: phone,
      href: `tel:${phone.replace(/[^+0-9]/g, "")}`,
      icon: Phone,
      type: t.typeCallNow,
    },
    {
      title: t.titleWhatsApp,
      value: phone,
      href: `https://wa.me/${whatsapp}`,
      icon: MessageCircle,
      type: t.typeChatOnWhatsApp,
      highlight: true,
    },
    {
      title: t.titleFacebook,
      value: "facebook.com/ridebangla",
      href: "https://facebook.com/ridebangla",
      icon: Facebook,
      type: t.typeFollowUs,
    },
    {
      title: t.titleInstagram,
      value: "instagram.com/ride.bangla_",
      href: "https://www.instagram.com/ride.bangla_",
      icon: Instagram,
      type: t.typeFollowUs,
    },
    {
      title: t.titleYouTube,
      value: "youtube.com/@ridebangla-0",
      href: "https://www.youtube.com/@ridebangla-0",
      icon: Youtube,
      type: t.typeSubscribe,
    },
    {
      title: t.titleTikTok,
      value: "tiktok.com/@ridebangla0",
      href: "https://www.tiktok.com/@ridebangla0",
      icon: FaTiktok,
      type: t.typeFollowUs,
    },
    {
      title: t.titleXTwitter,
      value: "x.com/enamulseddik",
      href: "https://x.com/enamulseddik",
      icon: FaXTwitter,
      type: t.typeFollowCeo,
    },
    {
      title: t.titleLocation,
      value: addressLabel,
      href: mapUrl,
      icon: MapPin,
      type: t.typeViewMap,
    },
  ];

  const submitMessage = useMutation({
    mutationFn: async (input: FormValues) => {
      const cleanName = input.name.trim();
      const cleanEmail = input.email.trim();
      const cleanMessage = input.message.trim();

      if (!cleanName || !cleanEmail || !cleanMessage) {
        throw new Error(t.errorRequired);
      }

      const finalSubject = `${input.department}: ${
        input.subject.trim() || "Contact message"
      }`;

      await submitWebsiteContact({
        name: cleanName,
        email: cleanEmail,
        phone: input.phone.trim(),
        subject: finalSubject,
        message: cleanMessage,
        source: "Contact Page",
      });
    },
    onSuccess: () => {
      setValues(initialValues);
      setFormError("");
    },
    onError: (error) => {
      setFormError(
        error instanceof Error
          ? error.message
          : t.errorGeneric
      );
    },
  });

  const updateValue = (key: keyof FormValues, value: string) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    submitMessage.mutate(values);
  };

  return (
    <SiteLayout>
      <main className="min-h-screen bg-white">
        <section className="bg-gradient-to-br from-green-50 via-white to-red-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-white p-2 shadow-sm ring-1 ring-green-100">
              <Logo className="h-full w-full object-contain" />
            </div>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
              {t.heroEyebrow}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-950 sm:text-5xl">
              {t.heroTitle}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
              {t.heroBody}
            </p>
          </div>
        </section>

        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  target={
                    item.href.startsWith("http") || item.href.startsWith("https")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.href.startsWith("http") || item.href.startsWith("https")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={`group rounded-3xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                    item.highlight
                      ? "border-green-200 bg-gradient-to-br from-green-600 to-green-700 text-white"
                      : "border-gray-100 bg-white hover:border-green-200"
                  }`}
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${
                        item.highlight
                          ? "bg-white/15 text-white group-hover:bg-white group-hover:text-green-700"
                          : "bg-green-50 text-green-700 group-hover:bg-green-700 group-hover:text-white"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <ExternalLink
                      className={`h-5 w-5 transition ${
                        item.highlight
                          ? "text-white/70 group-hover:text-white"
                          : "text-gray-300 group-hover:text-green-700"
                      }`}
                    />
                  </div>

                  <h2
                    className={`text-lg font-bold ${
                      item.highlight ? "text-white" : "text-gray-950"
                    }`}
                  >
                    {item.title}
                  </h2>
                  <p
                    className={`mt-2 break-words text-sm font-medium ${
                      item.highlight ? "text-white/85" : "text-gray-600"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p
                    className={`mt-5 text-sm font-bold ${
                      item.highlight ? "text-white" : "text-green-700"
                    }`}
                  >
                    {item.type}
                  </p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-green-100 bg-green-50 p-7 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-700">
                {t.formEyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-extrabold text-gray-950">
                {t.formTitle}
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
                {t.formBody}
              </p>

              <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <div>
                    <p className="text-sm font-bold text-gray-950">
                      {t.channelsTitle}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {t.channelsBody}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />
                  <div>
                    <p className="text-sm font-bold text-gray-950">
                      {t.routingTitle}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-gray-600">
                      {t.routingBody}
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/help-center"
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-green-200 bg-white px-5 py-3 text-sm font-bold text-green-700 shadow-sm transition hover:bg-green-700 hover:text-white"
              >
                <Headphones className="h-5 w-5" />
                {t.browseHelp}
              </Link>
            </div>

            <form
              onSubmit={onSubmit}
              className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t.labelName} required>
                  <input
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                    placeholder={t.phName}
                    className={inputClass}
                    maxLength={120}
                  />
                </Field>

                <Field label={t.labelPhone}>
                  <input
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                    placeholder={t.phPhone}
                    className={inputClass}
                    maxLength={40}
                  />
                </Field>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field label={t.labelEmail} required>
                  <input
                    type="email"
                    value={values.email}
                    onChange={(event) => updateValue("email", event.target.value)}
                    placeholder={t.phEmail}
                    className={inputClass}
                    maxLength={255}
                  />
                </Field>

                <Field label={t.labelDepartment}>
                  <select
                    value={values.department}
                    onChange={(event) =>
                      updateValue("department", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="General Support">{t.deptGeneral}</option>
                    <option value="Food Delivery">{t.deptFood}</option>
                    <option value="Courier Service">{t.deptCourier}</option>
                    <option value="Rider Support">{t.deptRider}</option>
                    <option value="Partner Support">{t.deptPartner}</option>
                    <option value="Business Partnership">{t.deptBusiness}</option>
                    <option value="Technical Issue">{t.deptTechnical}</option>
                    <option value="Website / App Issue">{t.deptWebApp}</option>
                  </select>
                </Field>
              </div>

              <div className="mt-4">
                <Field label={t.labelSubject}>
                  <input
                    value={values.subject}
                    onChange={(event) =>
                      updateValue("subject", event.target.value)
                    }
                    placeholder={t.phSubject}
                    className={inputClass}
                    maxLength={200}
                  />
                </Field>
              </div>

              <div className="mt-4">
                <Field label={t.labelMessage} required>
                  <textarea
                    value={values.message}
                    onChange={(event) =>
                      updateValue("message", event.target.value)
                    }
                    placeholder={t.phMessage}
                    className={`${inputClass} min-h-36 resize-y`}
                    maxLength={4000}
                  />
                </Field>
              </div>

              {formError && (
                <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {formError}
                </p>
              )}

              {submitMessage.isSuccess && (
                <div className="mt-4 flex items-start gap-3 rounded-2xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    {t.successBody}
                  </span>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={submitMessage.isPending}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-green-700 px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-green-800 disabled:opacity-60 sm:w-auto"
                >
                  {submitMessage.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                  {submitMessage.isPending ? t.submitSending : t.submitSend}
                </button>

                <Link
                  to="/help-center"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-4 text-sm font-bold text-gray-950 transition hover:border-green-200 hover:text-green-700 sm:w-auto"
                >
                  <Headphones className="h-5 w-5" />
                  {t.browseHelp}
                </Link>
              </div>
            </form>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl rounded-[2rem] bg-gray-950 p-8 text-white shadow-xl sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-400">
                  {t.supportEyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold">
                  {t.supportTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base">
                  {t.supportBody}
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <a
                  href={`mailto:${supportEmail}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  <Mail className="h-5 w-5" />
                  {t.emailSupport}
                </a>

                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-gray-950 transition hover:bg-gray-100"
                >
                  <MessageCircle className="h-6 w-6" />
                  {t.whatsappButton}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </SiteLayout>
  );
}

const inputClass =
  "w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100";

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-gray-950">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </span>
      {children}
    </label>
  );
}
