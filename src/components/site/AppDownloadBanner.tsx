import { Clock3 } from "lucide-react";
import { useMemo } from "react";
import { Logo } from "@/components/site/Logo";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  en: {
    appName: "Ride Bangla App",
    body: "Our mobile app is being prepared. Official store links will be added here after launch.",
    comingSoon: "Coming Soon",
  },
  bn: {
    appName: "Ride Bangla অ্যাপ",
    body: "আমাদের মোবাইল অ্যাপ প্রস্তুত করা হচ্ছে। লঞ্চের পর এখানে অফিসিয়াল স্টোর লিংক যোগ করা হবে।",
    comingSoon: "শীঘ্রই আসছে",
  },
} as const;

export function AppDownloadBanner() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <section className="px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 overflow-hidden rounded-[2rem] bg-[#06291f] p-6 text-center shadow-[0_25px_70px_rgba(0,45,30,.18)] sm:flex-row sm:justify-between sm:p-8 sm:text-left">
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 p-2">
            <Logo className="h-full w-full object-contain" />
          </div>
          <div>
            <p className="text-lg font-black text-white">
              Ride <span className="text-brand-red">Bangla</span>{" "}
              {language === "bn" ? "অ্যাপ" : "App"}
            </p>
            <p className="mt-1 text-xs leading-5 text-white/60">
              {t.body}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[.06] px-5 py-3 text-xs font-extrabold text-white">
          <Clock3 className="h-4 w-4 text-emerald-300" /> {t.comingSoon}
        </div>
      </div>
    </section>
  );
}
