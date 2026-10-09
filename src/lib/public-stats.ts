import { useEffect, useState } from "react";
import { doc, onSnapshot, type DocumentData, type Unsubscribe } from "firebase/firestore";
import { firebaseDb } from "@/integrations/firebase/client";

export type PublicStats = {
  happyCustomers: number | null;
  activeRiders: number | null;
  serviceCategories: number | null;
  supportLabel: string | null;
};

const EMPTY_STATS: PublicStats = {
  happyCustomers: null,
  activeRiders: null,
  serviceCategories: null,
  supportLabel: null,
};

function numberValue(raw: DocumentData, keys: string[]): number | null {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) return value;
    if (typeof value === "string" && value.trim() && /^\d+(\.\d+)?$/.test(value.trim())) {
      const parsed = Number(value);
      if (Number.isFinite(parsed) && parsed >= 0) return parsed;
    }
  }
  return null;
}

function stringValue(raw: DocumentData, keys: string[]): string | null {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function normalize(raw: DocumentData): PublicStats {
  return {
    happyCustomers: numberValue(raw, ["happy_customers", "happyCustomers", "customers", "customer_count"]),
    activeRiders: numberValue(raw, ["active_riders", "activeRiders", "riders", "rider_count"]),
    serviceCategories: numberValue(raw, ["service_categories", "serviceCategories", "services", "service_count"]),
    supportLabel: stringValue(raw, ["support_hours", "supportHours", "support_label", "supportLabel"]),
  };
}

function mergeStats(base: PublicStats, next: PublicStats): PublicStats {
  return {
    happyCustomers: next.happyCustomers ?? base.happyCustomers,
    activeRiders: next.activeRiders ?? base.activeRiders,
    serviceCategories: next.serviceCategories ?? base.serviceCategories,
    supportLabel: next.supportLabel ?? base.supportLabel,
  };
}

export function subscribeToPublicStats(callback: (stats: PublicStats) => void): Unsubscribe {
  if (!firebaseDb) {
    callback(EMPTY_STATS);
    return () => undefined;
  }

  const refs = [
    doc(firebaseDb, "website_public_stats", "home"),
    doc(firebaseDb, "website_stats", "home"),
  ];
  const current: PublicStats[] = refs.map(() => EMPTY_STATS);

  const unsubscribers = refs.map((ref, index) =>
    onSnapshot(
      ref,
      (snapshot) => {
        current[index] = snapshot.exists() ? normalize(snapshot.data()) : EMPTY_STATS;
        callback(current.reduce(mergeStats, EMPTY_STATS));
      },
      () => {
        current[index] = EMPTY_STATS;
        callback(current.reduce(mergeStats, EMPTY_STATS));
      },
    ),
  );

  return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
}

export function usePublicStats() {
  const [stats, setStats] = useState<PublicStats>(EMPTY_STATS);

  useEffect(() => subscribeToPublicStats(setStats), []);

  return stats;
}
