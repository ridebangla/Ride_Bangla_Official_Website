import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import {
  Search,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Send,
  Loader2,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { askHelpAi } from "@/lib/help-ai.functions";
import { useLanguage } from "@/context/LanguageContext";


type StaticFaq = {
  id: string;
  question: string;
  question_bn: string;
  answer: string;
  answer_bn: string;
};

const OFFICIAL_WHATSAPP = "8801309587749";

const STATIC_FAQS: StaticFaq[] = [
  {
    id: "official-platforms",
    question: "Where can I access Ride Bangla services?",
    question_bn: "Ride Bangla-এর সেবাগুলো কোথা থেকে ব্যবহার করা যাবে?",
    answer: "Use the official Apps & Platforms page to open the verified Customer, Partner, Rider, Agent and Studio websites.",
    answer_bn: "অফিশিয়াল Apps & Platforms পেজ থেকে Customer, Partner, Rider, Agent এবং Studio ওয়েবসাইটে প্রবেশ করুন।",
  },
  {
    id: "support-contact",
    question: "How can I contact Ride Bangla support?",
    question_bn: "Ride Bangla সাপোর্টের সঙ্গে কীভাবে যোগাযোগ করব?",
    answer: "Use the Contact page, support email or the official WhatsApp button shown on this website.",
    answer_bn: "এই ওয়েবসাইটের Contact পেজ, support email অথবা অফিসিয়াল WhatsApp বাটন ব্যবহার করুন।",
  },
  {
    id: "account-deletion",
    question: "How do I request account or data deletion?",
    question_bn: "অ্যাকাউন্ট অথবা ডাটা ডিলিট করার অনুরোধ কীভাবে করব?",
    answer: "Open the Delete Account or Data Deletion page and follow the official instructions for the relevant Ride Bangla service.",
    answer_bn: "Delete Account অথবা Data Deletion পেজ খুলে সংশ্লিষ্ট Ride Bangla সেবার অফিসিয়াল নির্দেশনা অনুসরণ করুন।",
  },
  {
    id: "official-updates",
    question: "Where are official Ride Bangla announcements published?",
    question_bn: "Ride Bangla-এর অফিসিয়াল ঘোষণা কোথায় প্রকাশ করা হয়?",
    answer: "Official announcements, text, images, videos and PDF updates are published on the Updates page.",
    answer_bn: "অফিশিয়াল ঘোষণা, লেখা, ছবি, ভিডিও ও PDF আপডেট Updates পেজে প্রকাশ করা হয়।",
  },
];

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center — Ride Bangla" },
      {
        name: "description",
        content:
          "Frequently asked questions and official support resources for Ride Bangla customers, riders, partners and businesses.",
      },
      { property: "og:title", content: "Help Center — Ride Bangla" },
      {
        property: "og:description",
        content:
          "Search FAQs, ask Ride Bangla AI or contact official support.",
      },
      { property: "og:url", content: "https://ridebangla.bd/help-center" },
    ],
    links: [{ rel: "canonical", href: "https://ridebangla.bd/help-center" }],
  }),
  component: HelpCenterPage,
});

function HelpCenterPage() {
  const [q, setQ] = useState("");
  const { pick } = useLanguage();

  const faqs = STATIC_FAQS;
  const whatsappNumber = OFFICIAL_WHATSAPP;

  const filtered = useMemo(() => {
    const items = faqs ?? [];
    const needle = q.trim().toLowerCase();

    if (!needle) return items;

    return items.filter((faq) => {
      const question = pick(faq.question, faq.question_bn).toLowerCase();
      const answer = pick(faq.answer, faq.answer_bn).toLowerCase();
      return question.includes(needle) || answer.includes(needle);
    });
  }, [faqs, pick, q]);

  return (
    <SiteLayout>
      <PageHeader
        title="Help Center"
        subtitle="Search FAQs, ask Ride Bangla AI or contact our official support team."
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <SupportCard
            icon={<Headphones className="h-5 w-5" />}
            title="Customer Support"
            body="Get help with food, courier, account and website-related questions."
          />
          <SupportCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Official Channel"
            body="Use only Ride Bangla official contact links for safe communication."
          />
          <SupportCard
            icon={<MessageSquare className="h-5 w-5" />}
            title="Partner & Rider Help"
            body="Support for riders, partners, home kitchens and local businesses."
          />
        </div>

        <AiAssistant />

        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Search common questions about Ride Bangla services.
              </p>
            </div>

            <Link
              to="/contact"
              search={{ source: "Help Center" }}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Support
            </Link>
          </div>

          <div className="relative mt-5">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(event) => setQ(event.target.value)}
              placeholder="Search FAQs…"
              aria-label="Search FAQs"
              className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
            />
          </div>

          <div className="mt-6 space-y-3">
            {filtered.length === 0 ? (
              <p className="rounded-lg border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
                No matching answers. Try different keywords, or contact our
                support team below.
              </p>
            ) : (
              filtered.map((faq) => (
                <details
                  key={faq.id}
                  className="group rounded-xl border border-border bg-background p-4 transition open:shadow-sm hover:border-brand-green/30"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground">
                    <span>{pick(faq.question, faq.question_bn)}</span>
                    <span className="ml-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition group-open:rotate-45">
                      +
                    </span>
                  </summary>

                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                    {pick(faq.answer, faq.answer_bn)}
                  </p>
                </details>
              ))
            )}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-green/30 bg-brand-green-soft p-6 text-center shadow-sm sm:p-8">
          <h2 className="text-xl font-bold text-foreground">
            Still need help?
          </h2>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Our support team can help with customer, rider, partner, courier,
            food order and business-related questions.
          </p>

          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              search={{ source: "Help Center" }}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark"
            >
              Contact Support <ArrowRight className="h-4 w-4" />
            </Link>

            {whatsappNumber ? (
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand-green/30 bg-background px-5 py-3 text-sm font-semibold text-brand-green shadow-sm transition hover:bg-white"
              >
                <FaWhatsapp className="h-4 w-4" />
                WhatsApp Support
              </a>
            ) : null}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

const AI_CHAT_STORAGE_KEY = "ride_bangla_help_ai_messages";
const MAX_STORED_AI_MESSAGES = 24;

type AiChatMessage = {
  id: string;
  role: "user" | "model";
  text: string;
};

function loadStoredAiMessages(): AiChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.sessionStorage.getItem(AI_CHAT_STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is AiChatMessage =>
        Boolean(
          item &&
            typeof item.id === "string" &&
            (item.role === "user" || item.role === "model") &&
            typeof item.text === "string" &&
            item.text.trim().length > 0,
        ),
      )
      .slice(-MAX_STORED_AI_MESSAGES);
  } catch {
    return [];
  }
}

function persistAiMessages(messages: AiChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(
      AI_CHAT_STORAGE_KEY,
      JSON.stringify(messages.slice(-MAX_STORED_AI_MESSAGES)),
    );
  } catch {
    // The chat remains usable in memory when browser storage is unavailable.
  }
}

function AiAssistant() {
  const ask = useServerFn(askHelpAi);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  // Start with the same empty state on the server and first client render.
  // Stored messages are restored after mount to prevent hydration mismatch.
  const [messages, setMessages] = useState<AiChatMessage[]>([]);
  const [storageReady, setStorageReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const conversationEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(loadStoredAiMessages());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    conversationEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, loading]);

  useEffect(() => {
    if (storageReady) persistAiMessages(messages);
  }, [messages, storageReady]);

  const resizeInput = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 240)}px`;
  };

  const onAsk = async (event: React.FormEvent) => {
    event.preventDefault();

    const q = question.trim();
    if (q.length < 2 || loading) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: "user" as const,
      text: q,
    };
    const history = messages
      .filter((message) => !message.id.startsWith("model-error-"))
      .slice(-12)
      .map(({ role, text }) => ({ role, text }));

    setMessages((current) => [...current, userMessage]);
    setQuestion("");
    setLoading(true);
    setError(null);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
    }

    try {
      const response = await ask({ data: { question: q, history } });

      if (response.ok) {
        setMessages((current) => [
          ...current,
          {
            id: `model-${Date.now()}`,
            role: "model",
            text: response.answer,
          },
        ]);
      } else {
        setMessages((current) => [
          ...current,
          {
            id: `model-error-${Date.now()}`,
            role: "model",
            text: response.error,
          },
        ]);
        setError(response.error);
      }
    } catch {
      const message = "Could not reach AI support. Please try again or contact official Support.";
      setMessages((current) => [
        ...current,
        {
          id: `model-error-${Date.now()}`,
          role: "model",
          text: message,
        },
      ]);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const clearConversation = () => {
    setMessages([]);
    setError(null);
    try {
      window.sessionStorage.removeItem(AI_CHAT_STORAGE_KEY);
    } catch {
      // Ignore storage restrictions; in-memory conversation is already cleared.
    }
  };

  return (
    <div className="mb-8 rounded-2xl border border-brand-green/30 bg-gradient-to-br from-brand-green-soft to-background p-5 shadow-sm sm:p-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white shadow-sm">
          <Sparkles className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-foreground sm:text-lg">
            Ask Ride Bangla AI
          </h2>
          <p className="text-xs leading-5 text-muted-foreground">
            Get general guidance while keeping your conversation visible. For
            account, order, payment or urgent help, contact official Support.
          </p>
        </div>

        {messages.length > 0 ? (
          <button
            type="button"
            onClick={clearConversation}
            disabled={loading}
            className="shrink-0 rounded-lg border border-border bg-background px-3 py-2 text-xs font-semibold text-muted-foreground transition hover:border-brand-green/40 hover:text-brand-green disabled:opacity-60"
          >
            Clear chat
          </button>
        ) : null}
      </div>

      {messages.length > 0 ? (
        <div
          className="mt-4 max-h-[34rem] space-y-3 overflow-y-auto rounded-xl border border-border bg-background/80 p-3 sm:p-4"
          aria-live="polite"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[92%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[82%] ${
                  message.role === "user"
                    ? "bg-brand-green text-white"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                <div className="mb-1 text-[10px] font-bold uppercase tracking-wider opacity-75">
                  {message.role === "user" ? "You" : "Ride Bangla AI"}
                </div>
                {message.text}
              </div>
            </div>
          ))}

          {loading ? (
            <div className="flex justify-start">
              <div className="inline-flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                AI is preparing a response…
              </div>
            </div>
          ) : null}
          <div ref={conversationEndRef} aria-hidden="true" />
        </div>
      ) : null}

      <form onSubmit={onAsk} className="mt-4 flex flex-col items-end gap-2 sm:flex-row">
        <textarea
          ref={inputRef}
          value={question}
          onChange={(event) => {
            setQuestion(event.target.value);
            resizeInput(event.currentTarget);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          maxLength={2000}
          rows={1}
          placeholder="Write your question…"
          aria-label="Ask the Ride Bangla AI assistant"
          className="max-h-60 min-h-12 w-full resize-none overflow-y-auto rounded-lg border border-border bg-background px-3 py-3 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground/70 focus:border-brand-green focus:ring-2 focus:ring-brand-green/25"
        />

        <button
          type="submit"
          disabled={loading || question.trim().length < 2}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark disabled:opacity-60 sm:min-w-28"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
          {loading ? "Thinking…" : "Send"}
        </button>
      </form>

      <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
        Press Enter to send and Shift + Enter for a new line. Do not share
        passwords, OTP codes, payment credentials or other sensitive data.
      </p>

      {error ? (
        <div className="mt-4 rounded-lg border border-brand-red/30 bg-brand-red-soft p-4 text-sm text-foreground">
          {error}{" "}
          <Link
            to="/contact"
            search={{ source: "Help Center" }}
            className="font-semibold text-brand-red hover:underline"
          >
            Contact Support
          </Link>
        </div>
      ) : null}
    </div>
  );
}

function SupportCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green">
        {icon}
      </div>
      <h3 className="mt-3 text-base font-bold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}
