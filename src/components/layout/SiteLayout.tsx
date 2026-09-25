import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Sparkles, type LucideIcon } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  eyebrow = "Ride Bangla",
  icon: Icon = Sparkles,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="relative overflow-hidden bg-[#06291f]">
      {/* Decorative background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-green/40 blur-[90px]" />
        <div className="absolute -bottom-28 -right-16 h-72 w-72 rounded-full bg-brand-red/30 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
        <nav className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-white/60">
          <Link to="/" className="transition hover:text-white">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white/90">{title}</span>
        </nav>

        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300 ring-1 ring-white/15 backdrop-blur">
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </span>

        <h1 className="mt-5 max-w-3xl text-3xl font-black tracking-tight text-white sm:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
            {subtitle}
          </p>
        )}

        <div className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-brand-red to-brand-green" />
      </div>

      {/* Bottom curve into page background */}
      <svg
        className="relative block h-8 w-full text-background sm:h-12"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" fill="currentColor" />
      </svg>
    </section>
  );
}