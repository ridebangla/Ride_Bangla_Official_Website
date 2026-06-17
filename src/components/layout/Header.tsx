import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Bell, Menu, X } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { supabase } from "@/integrations/supabase/client";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/apps", label: "Apps" },
  { to: "/updates", label: "Updates" },
  { to: "/help-center", label: "Help Center" },
  { to: "/contact", label: "Contact" },
] as const;

type UpdateNotification = {
  id: string;
  title: string;
  excerpt: string | null;
  description: string | null;
  category: string | null;
  published_at: string | null;
};

export function Header() {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { data: notifications } = useQuery({
    queryKey: ["header_update_notifications"],
    retry: false,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("updates")
        .select("id,title,excerpt,description,category,published_at")
        .eq("is_published", true)
        .order("published_at", { ascending: false })
        .limit(5);

      if (error) return [];
      return (data ?? []) as UpdateNotification[];
    },
  });

  const notificationCount = notifications?.length ?? 0;

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4">
        <Link
          to="/"
          className="flex items-center gap-2"
          aria-label="Ride Bangla home"
        >
          <Logo className="h-10 w-10 object-contain" />
          <span className="text-base font-bold text-foreground">
            Ride Bangla
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-brand-green-dark"
              activeProps={{
                className:
                  "rounded-md px-3 py-2 text-sm font-semibold text-brand-green bg-secondary",
              }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotificationOpen((value) => !value)}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-secondary"
              aria-label="Website update notifications"
            >
              <Bell className="h-5 w-5 text-foreground" />

              {notificationCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                  {notificationCount}
                </span>
              )}
            </button>

            {notificationOpen && (
              <div className="absolute right-0 top-12 w-80 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                <div className="border-b border-border px-4 py-3">
                  <p className="text-sm font-bold text-foreground">
                    Website Updates
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Latest Ride Bangla announcements
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {!notifications || notifications.length === 0 ? (
                    <div className="px-4 py-5 text-sm text-muted-foreground">
                      No updates yet.
                    </div>
                  ) : (
                    notifications.map((update) => (
                      <Link
                        key={update.id}
                        to="/updates"
                        onClick={() => setNotificationOpen(false)}
                        className="block border-b border-border px-4 py-3 last:border-b-0 hover:bg-secondary"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-green-soft text-brand-green">
                            <Bell className="h-4 w-4" />
                          </span>

                          <div className="min-w-0">
                            <p className="line-clamp-1 text-sm font-semibold text-foreground">
                              {update.title}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                              {update.excerpt ??
                                update.description ??
                                "New Ride Bangla update published."}
                            </p>
                            {update.category && (
                              <span className="mt-2 inline-flex rounded-full bg-brand-orange-soft px-2 py-0.5 text-[10px] font-semibold text-brand-orange">
                                {update.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>

                <Link
                  to="/updates"
                  onClick={() => setNotificationOpen(false)}
                  className="block border-t border-border px-4 py-3 text-center text-sm font-semibold text-brand-green hover:bg-secondary"
                >
                  View all updates
                </Link>
              </div>
            )}
          </div>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          className="border-t border-border bg-background md:hidden"
          aria-label="Mobile"
        >
          <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
            {nav.map((n) => (
              <li key={n.to}>
                <Link
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-secondary"
                  activeProps={{
                    className:
                      "block rounded-md px-3 py-2 text-base font-semibold text-brand-green bg-secondary",
                  }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
