import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { SafeMediaImage } from "@/components/site/SafeMediaImage";
import type { WebsiteUpdate } from "@/lib/website-data";

const AUTO_ROTATE_MS = 6000;

function cleanUrl(url: string | null) {
  return url?.trim() || "";
}

export function UpdatesSpotlight({
  updates,
  language,
  pick,
  onOpen,
}: {
  updates: WebsiteUpdate[];
  language: "en" | "bn";
  pick: (en?: string | null, bn?: string | null) => string;
  onOpen: (id: string) => void;
}) {
  const items = useMemo(() => updates.slice(0, 6), [updates]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setActiveIndex(0);
  }, [items.length]);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, AUTO_ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  if (items.length === 0) return null;

  const active = items[activeIndex];
  const imageUrl = cleanUrl(active.image_url);
  const hasImage = Boolean(imageUrl);
  const text =
    (language === "bn" ? active.body_bn || active.excerpt_bn : active.body || active.excerpt) || "";
  const isOffer = (active.category || "").toLowerCase().includes("offer");

  const goTo = (index: number) => setActiveIndex(((index % items.length) + items.length) % items.length);

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-[#d9e8df] bg-[#06291f] shadow-[0_30px_80px_rgba(0,42,28,.18)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
        <button
          type="button"
          onClick={() => onOpen(active.id)}
          className="relative block aspect-[16/10] w-full overflow-hidden bg-[#041f17] text-left sm:aspect-[16/8] lg:aspect-auto lg:h-full lg:min-h-[320px]"
        >
          {hasImage ? (
            <SafeMediaImage
              src={imageUrl}
              alt={pick(active.title, active.title_bn)}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition duration-700 hover:scale-105"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-green-dark to-[#041f17] text-white/30">
              <Sparkles className="h-14 w-14" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent lg:hidden" />
        </button>

        <div className="flex flex-col justify-center p-6 text-white sm:p-9">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-emerald-200 backdrop-blur-md">
              <Sparkles className="h-3 w-3" />
              {language === "bn" ? "সর্বশেষ" : "Latest"}
            </span>
            {active.category ? (
              <span
                className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.14em] ${
                  isOffer ? "bg-brand-red text-white" : "bg-white/10 text-white/80"
                }`}
              >
                {active.category}
              </span>
            ) : null}
          </div>

          <h2 className="mt-3 line-clamp-2 text-xl font-black leading-tight sm:text-2xl lg:text-[26px]">
            {pick(active.title, active.title_bn)}
          </h2>
          {text ? (
            <p className="mt-2 line-clamp-3 text-[13px] leading-6 text-white/75 sm:text-sm">{text}</p>
          ) : null}

          <button
            type="button"
            onClick={() => onOpen(active.id)}
            className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-[11px] font-black text-[#06291f] transition hover:bg-emerald-100"
          >
            {language === "bn" ? "বিস্তারিত দেখুন" : "Read full update"}
          </button>

          {items.length > 1 ? (
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                aria-label={language === "bn" ? "আগের আপডেট" : "Previous update"}
                onClick={() => goTo(activeIndex - 1)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex flex-1 items-center gap-1.5 overflow-x-auto">
                {items.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={language === "bn" ? `আপডেট ${index + 1} দেখুন` : `Show update ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={`h-1.5 shrink-0 rounded-full transition-all ${
                      index === activeIndex ? "w-6 bg-white" : "w-1.5 bg-white/30"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                aria-label={language === "bn" ? "পরের আপডেট" : "Next update"}
                onClick={() => goTo(activeIndex + 1)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                aria-label={language === "bn" ? (paused ? "অটো-স্লাইড চালু করুন" : "অটো-স্লাইড থামান") : (paused ? "Resume auto-slide" : "Pause auto-slide")}
                onClick={() => setPaused((value) => !value)}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
              >
                {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
