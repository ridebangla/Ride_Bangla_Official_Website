import { Link } from "@tanstack/react-router";
import { Apple, PlayCircle } from "lucide-react";
import { Logo } from "@/components/site/Logo";

/**
 * Shared promotional banner shown near the bottom of every page (see
 * SiteLayout). Update PLAY_STORE_URL / APP_STORE_URL below once the app is
 * live on each store — until then both buttons route to the in-app "Apps"
 * page so they're never dead links.
 */
const PLAY_STORE_URL: string | null = null;
const APP_STORE_URL: string | null = null;

export function AppDownloadBanner() {
  return (
    <section className="px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-[#06291f] p-6 text-center shadow-[0_25px_70px_rgba(0,45,30,.18)] sm:flex-row sm:justify-between sm:p-8 sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 p-2">
            <Logo className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-lg font-black text-white">
              Download <span className="text-brand-red">Ride</span> <span className="text-emerald-300">Bangla</span> App
            </p>
            <p className="mt-1 text-xs leading-5 text-white/60">
              Order food, book a ride, send parcels and track everything in real-time — all in one app.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {PLAY_STORE_URL ? (
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/15"
            >
              <PlayCircle className="h-4 w-4" /> Google Play
            </a>
          ) : (
            <Link
              to="/apps"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/15"
            >
              <PlayCircle className="h-4 w-4" /> Google Play
            </Link>
          )}
          {APP_STORE_URL ? (
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/15"
            >
              <Apple className="h-4 w-4" /> App Store
            </a>
          ) : (
            <Link
              to="/apps"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-white/15"
            >
              <Apple className="h-4 w-4" /> App Store
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
