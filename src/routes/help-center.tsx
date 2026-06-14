import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, MessageSquare, ArrowRight } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/help-center")({
  head: () => ({
    meta: [
      { title: "Help Center — Ride Bangla" },
      { name: "description", content: "Frequently asked questions and support resources for Ride Bangla customers, riders and partners." },
    ],
    links: [{ rel: "canonical", href: "/help-center" }],
  }),
  component: HelpCenterPage,
});

function HelpCenterPage() {
  const [q, setQ] = useState("");
  const { data: faqs } = useQuery({
    queryKey: ["faqs"],
    queryFn: async () => (await supabase.from("faqs").select("*").order("sort_order", { ascending: true })).data ?? [],
  });

  const filtered = useMemo(() => {
    if (!faqs) return [];
    const needle = q.trim().toLowerCase();
    if (!needle) return faqs;
    return faqs.filter((f) => f.question.toLowerCase().includes(needle) || f.answer.toLowerCase().includes(needle));
  }, [faqs, q]);

  return (
    <SiteLayout>
      <PageHeader title="Help Center" subtitle="Search our FAQs or reach out — our support team is here for you." />
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search FAQs…"
            aria-label="Search FAQs"
            className="w-full rounded-lg border border-border bg-background py-3 pl-10 pr-4 text-sm outline-none focus:border-brand-green"
          />
        </div>

        <div className="mt-6 space-y-3">
          {filtered.length === 0 ? (
            <p className="rounded-lg border border-dashed border-border bg-card p-6 text-center text-sm text-muted-foreground">
              No matching answers. Try different keywords, or contact our support team below.
            </p>
          ) : (
            filtered.map((f) => (
              <details key={f.id} className="group rounded-xl border border-border bg-card p-4 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-foreground">
                  <span>{f.question}</span>
                  <span className="ml-3 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green-soft text-brand-green transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 whitespace-pre-line text-sm text-muted-foreground">{f.answer}</p>
              </details>
            ))
          )}
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            to="/contact"
            search={{ source: "Help Center" }}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
          >
            <MessageSquare className="h-4 w-4" /> Contact Support
          </Link>
        </div>

        <div className="mt-12 rounded-2xl border border-brand-green/30 bg-brand-green-soft p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-foreground">Still need help?</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
            Our support team is happy to answer your questions and help with any issues.
          </p>
          <Link
            to="/contact"
            search={{ source: "Help Center" }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand-green px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-dark"
          >
            Contact Support <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}