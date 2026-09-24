import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, Globe2, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { subscribeToWebsiteUpdates } from "@/lib/realtime-updates";
import type { WebsiteUpdate } from "@/lib/website-data";

const nav = [
  { to: "/", key: "home" },
  { to: "/about", key: "about" },
  { to: "/services", key: "services" },
  { to: "/apps", key: "apps" },
  { to: "/updates", key: "updates" },
  { to: "/contact", key: "contact" },
] as const;

const READ_KEY = "ride_bangla_read_update_ids";
const MAX_STORED_READ_IDS = 200;

function formatNotificationDate(value: string | null, locale: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString(locale);
}

export function Header() {
  const { language, toggleLanguage, t, pick } = useLanguage();
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState<WebsiteUpdate[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(window.localStorage.getItem(READ_KEY) || "[]");
      setReadIds(Array.isArray(stored) ? stored.filter((id): id is string => typeof id === "string").slice(-MAX_STORED_READ_IDS) : []);
    } catch {
      setReadIds([]);
    }
    return subscribeToWebsiteUpdates(setNotifications, 8, console.error);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((item) => !readIds.includes(item.id)).length, [notifications, readIds]);

  const markRead = (id: string) => {
    setReadIds((current) => {
      const ids = Array.from(new Set([...current, id])).slice(-MAX_STORED_READ_IDS);
      try { window.localStorage.setItem(READ_KEY, JSON.stringify(ids)); } catch { /* keep UI usable */ }
      return ids;
    });
  };

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-7xl rounded-2xl border border-slate-200/80 bg-white/95 shadow-[0_15px_50px_rgba(0,45,30,.10)] backdrop-blur-xl">
        <div className="flex h-[68px] items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-3" aria-label="Ride Bangla home" onClick={() => setOpen(false)}>
            <Logo className="h-11 w-11 object-contain" />
            <div className="leading-none">
              <span className="block text-lg font-black tracking-tight text-[#06291f]">Ride <span className="text-brand-green">Bangla</span></span>
              <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[.16em] text-brand-red">Limited · Fast · Safe · Reliable</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-emerald-50 hover:text-brand-green"
                activeProps={{ className: "rounded-xl bg-emerald-50 px-3 py-2 text-xs font-extrabold text-brand-green" }}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleLanguage} className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-xs font-extrabold text-slate-700 transition hover:border-emerald-200 hover:text-brand-green sm:inline-flex" aria-label="Switch website language">
              <Globe2 className="h-4 w-4" /> {language === "en" ? "বাংলা" : "English"}
            </button>

            <div className="relative">
              <button type="button" onClick={() => setNotificationOpen((value) => !value)} className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-emerald-200 hover:text-brand-green" aria-label={t("notifications")}>
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand-red px-1 text-[9px] font-black text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>}
              </button>
              {notificationOpen && (
                <div className="absolute right-0 top-12 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 px-4 py-3"><p className="text-sm font-black text-slate-900">{t("notifications")}</p><p className="text-[11px] text-slate-500">{t("latestAnnouncements")}</p></div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? <div className="px-4 py-6 text-sm text-slate-500">{t("noUpdates")}</div> : notifications.map((update) => (
                      <Link key={update.id} to="/updates" onClick={() => { markRead(update.id); setNotificationOpen(false); }} className="block border-b border-slate-100 px-4 py-3 hover:bg-emerald-50">
                        <p className="line-clamp-1 text-sm font-bold text-slate-900">{pick(update.title, update.title_bn)}</p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">{pick(update.excerpt || update.body, update.excerpt_bn || update.body_bn)}</p>
                        {formatNotificationDate(update.published_at, language === "bn" ? "bn-BD" : "en-US") && <time className="mt-1 block text-[10px] text-slate-400">{formatNotificationDate(update.published_at, language === "bn" ? "bn-BD" : "en-US")}</time>}
                      </Link>
                    ))}
                  </div>
                  <Link to="/updates" onClick={() => setNotificationOpen(false)} className="block border-t border-slate-100 px-4 py-3 text-center text-xs font-extrabold text-brand-green hover:bg-emerald-50">{t("viewAllUpdates")}</Link>
                </div>
              )}
            </div>

            <Link to="/contact" className="hidden rounded-xl bg-brand-red px-4 py-2.5 text-xs font-extrabold text-white shadow-md transition hover:bg-red-500 lg:inline-flex">Get Started</Link>
            <button type="button" className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 xl:hidden" onClick={() => { setOpen((value) => !value); setNotificationOpen(false); }} aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-slate-100 px-4 py-3 xl:hidden">
            <div className="grid gap-1 sm:grid-cols-2">
              {nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-brand-green" activeProps={{ className: "rounded-xl bg-emerald-50 px-3 py-2.5 text-sm font-extrabold text-brand-green" }}>{t(item.key)}</Link>)}
            </div>
            <button type="button" onClick={toggleLanguage} className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 sm:hidden"><Globe2 className="h-4 w-4" /> {language === "en" ? "বাংলা" : "English"}</button>
          </nav>
        )}
      </div>
    </header>
  );
}
