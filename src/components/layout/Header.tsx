import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bell, Languages, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { subscribeToWebsiteUpdates } from "@/lib/realtime-updates";
import type { WebsiteUpdate } from "@/lib/website-data";

const nav = [
  { to: "/", key: "home" }, { to: "/about", key: "about" },
  { to: "/services", key: "services" }, { to: "/apps", key: "apps" },
  { to: "/updates", key: "updates" }, { to: "/help-center", key: "help" },
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
      setReadIds(
        Array.isArray(stored)
          ? stored.filter((id): id is string => typeof id === "string").slice(-MAX_STORED_READ_IDS)
          : [],
      );
    } catch {
      setReadIds([]);
    }
    return subscribeToWebsiteUpdates(setNotifications, 8, console.error);
  }, []);

  const unreadCount = useMemo(() => notifications.filter((item) => !readIds.includes(item.id)).length, [notifications, readIds]);

  const persistReadIds = (ids: string[]) => {
    const boundedIds = ids.slice(-MAX_STORED_READ_IDS);
    try {
      window.localStorage.setItem(READ_KEY, JSON.stringify(boundedIds));
    } catch {
      // Notification interactions must remain usable when storage is blocked.
    }
  };

  const markRead = (id: string) => {
    setReadIds((current) => {
      const ids = Array.from(new Set([...current, id]));
      persistReadIds(ids);
      return ids.slice(-MAX_STORED_READ_IDS);
    });
  };

  const markAllRead = () => {
    setReadIds((current) => {
      const ids = Array.from(
        new Set([...current, ...notifications.map((item) => item.id)]),
      );
      persistReadIds(ids);
      return ids.slice(-MAX_STORED_READ_IDS);
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Ride Bangla home" onClick={() => { setOpen(false); setNotificationOpen(false); }}>
          <Logo className="h-10 w-10 object-contain drop-shadow-sm" />
          <div className="min-w-0"><span className="block text-base font-bold leading-tight">Ride Bangla</span><span className="hidden text-[10px] font-semibold uppercase tracking-wider text-brand-green sm:block">{t("digitalEcosystem")}</span></div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => <Link key={item.to} to={item.to} className="rounded-xl px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-brand-green-dark" activeProps={{ className: "rounded-xl px-3 py-2 text-sm font-semibold text-brand-green bg-secondary" }}>{t(item.key)}</Link>)}
        </nav>

        <div className="flex items-center gap-1.5">
          <button type="button" onClick={toggleLanguage} className="inline-flex h-10 items-center gap-2 rounded-xl border border-brand-green/15 bg-brand-green-soft px-3 text-xs font-bold text-brand-green transition hover:bg-brand-green hover:text-white" aria-label="Switch website language"><Languages className="h-4 w-4" />{language === "en" ? "বাংলা" : "English"}</button>
          <div className="relative">
            <button type="button" onClick={() => { setNotificationOpen(!notificationOpen); setOpen(false); }} className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-secondary" aria-label={t("notifications")} aria-expanded={notificationOpen}>
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">{unreadCount > 9 ? "9+" : unreadCount}</span>}
            </button>
            {notificationOpen && <div className="absolute right-0 top-12 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
              <div className="flex items-start justify-between gap-3 border-b border-border px-4 py-3"><div><p className="text-sm font-bold">{t("notifications")}</p><p className="text-xs text-muted-foreground">{t("latestAnnouncements")}</p></div>{unreadCount > 0 && <button type="button" onClick={markAllRead} className="shrink-0 text-xs font-semibold text-brand-green hover:underline">{language === "bn" ? "সব পড়া হয়েছে" : "Mark all read"}</button>}</div>
              <div className="max-h-96 overflow-y-auto">{notifications.length === 0 ? <div className="px-4 py-6 text-sm text-muted-foreground">{t("noUpdates")}</div> : notifications.map((update) => <Link key={update.id} to="/updates" hash={`update-${update.id}`} onClick={() => { markRead(update.id); setNotificationOpen(false); }} className={`block border-b border-border px-4 py-3 transition hover:bg-secondary ${!readIds.includes(update.id) ? "bg-brand-green-soft/40" : ""}`}><div className="flex gap-3"><span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-green-soft text-brand-green"><Bell className="h-4 w-4" /></span><div className="min-w-0"><p className="line-clamp-1 text-sm font-semibold">{pick(update.title, update.title_bn)}</p>{pick(update.excerpt || update.body, update.excerpt_bn || update.body_bn) && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{pick(update.excerpt || update.body, update.excerpt_bn || update.body_bn)}</p>}{formatNotificationDate(update.published_at, language === "bn" ? "bn-BD" : "en-US") ? <time className="mt-2 block text-[10px] text-muted-foreground">{formatNotificationDate(update.published_at, language === "bn" ? "bn-BD" : "en-US")}</time> : null}</div></div></Link>)}</div>
              <Link to="/updates" onClick={() => setNotificationOpen(false)} className="block border-t border-border px-4 py-3 text-center text-sm font-semibold text-brand-green hover:bg-secondary">{t("viewAllUpdates")}</Link>
            </div>}
          </div>
          <button className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-secondary lg:hidden" onClick={() => { setOpen(!open); setNotificationOpen(false); }} aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </div>
      {open && <nav className="border-t border-border bg-background shadow-sm lg:hidden"><ul className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:grid-cols-2">{nav.map((item) => <li key={item.to}><Link to={item.to} onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2.5 text-base font-medium hover:bg-secondary" activeProps={{ className: "block rounded-xl px-3 py-2.5 text-base font-semibold text-brand-green bg-secondary" }}>{t(item.key)}</Link></li>)}</ul></nav>}
    </header>
  );
}
