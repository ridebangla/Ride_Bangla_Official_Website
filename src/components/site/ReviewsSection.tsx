import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LogOut, Loader2, Star } from "lucide-react";
import {
  getOwnReview,
  handleRedirectResult,
  signInToReview,
  signOutOfReviews,
  submitReview,
  useReviewAuthUser,
  useReviews,
  type Review,
} from "@/lib/reviews";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  en: {
    verified: "Verified Google Account",
    shareExperience: "Share your experience",
    signInBody:
      "Sign in with your Google account to leave a real, verified review. One account, one honest review — no fake ratings.",
    signInWithGoogle: "Sign in with Google",
    signInFail: "Sign-in was cancelled or failed. Please try again.",
    submitFail: "Could not submit your review.",
    signedInWith: "Signed in with Google",
    signOut: "Sign out",
    thankYou: "Thank you! Your review is live.",
    editReview: "Edit your review",
    yourRating: "Your rating",
    reviewPlaceholder: "Tell others about your experience with Ride Bangla...",
    postReview: "Post Review",
    star: "star",
    stars: "stars",
    heading: "What Our Customers Say",
    subheading: "Real people. Real experiences.",
    writeReview: "Write a Review",
    closeReview: "Close Review",
    noReviews: "No customer reviews are published yet.",
  },
  bn: {
    verified: "যাচাইকৃত Google অ্যাকাউন্ট",
    shareExperience: "আপনার অভিজ্ঞতা শেয়ার করুন",
    signInBody:
      "বাস্তব, যাচাইকৃত রিভিউ দিতে আপনার Google অ্যাকাউন্ট দিয়ে সাইন ইন করুন। একটি অ্যাকাউন্ট, একটি সৎ রিভিউ — কোনো ভুয়া রেটিং নয়।",
    signInWithGoogle: "Google দিয়ে সাইন ইন",
    signInFail: "সাইন-ইন বাতিল হয়েছে বা ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    submitFail: "আপনার রিভিউ জমা দেওয়া যায়নি।",
    signedInWith: "Google দিয়ে সাইন ইন করেছেন",
    signOut: "সাইন আউট",
    thankYou: "ধন্যবাদ! আপনার রিভিউ লাইভ হয়েছে।",
    editReview: "আপনার রিভিউ সম্পাদনা করুন",
    yourRating: "আপনার রেটিং",
    reviewPlaceholder: "Ride Bangla নিয়ে আপনার অভিজ্ঞতা অন্যদের জানান...",
    postReview: "রিভিউ পোস্ট করুন",
    star: "স্টার",
    stars: "স্টার",
    heading: "আমাদের গ্রাহকরা যা বলেন",
    subheading: "বাস্তব মানুষ। বাস্তব অভিজ্ঞতা।",
    writeReview: "রিভিউ লিখুন",
    closeReview: "রিভিউ বন্ধ করুন",
    noReviews: "এখনো কোনো গ্রাহক রিভিউ প্রকাশিত হয়নি।",
  },
} as const;

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "R";
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const [broken, setBroken] = useState(false);
  if (photoUrl && !broken) {
    return (
      <img
        src={photoUrl}
        alt={name}
        referrerPolicy="no-referrer"
        onError={() => setBroken(true)}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
      />
    );
  }
  return (
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-emerald-50 text-sm font-black text-brand-green">
      {initials(name)}
    </span>
  );
}

function StarRow({ value, size = "h-3 w-3" }: { value: number; size?: string }) {
  return (
    <div className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} className={`${size} ${index < value ? "fill-current" : "fill-none text-slate-200"}`} />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const timeAgo = review.created_at
    ? formatDistanceToNow(new Date(review.created_at), { addSuffix: true })
    : null;
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <Avatar name={review.name} photoUrl={review.photo_url} />
        <div>
          <p className="text-sm font-black text-slate-900">{review.name}</p>
          <StarRow value={review.rating} />
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600">{review.comment}</p>
      <div className="mt-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700 normal-case tracking-normal">
          {t.verified}
        </span>
        {timeAgo && <span>{timeAgo}</span>}
      </div>
    </div>
  );
}

function WriteReviewCard() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const { user, ready } = useReviewAuthUser();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loadingExisting, setLoadingExisting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoadingExisting(true);
    getOwnReview(user.uid)
      .then((existing) => {
        if (existing) {
          setRating(existing.rating);
          setComment(existing.comment);
        }
      })
      .finally(() => setLoadingExisting(false));
  }, [user]);

  const handleSignIn = async () => {
    setError(null);
    setSigningIn(true);
    try {
      await signInToReview();
    } catch (err) {
      // REDIRECTING means mobile redirect started — page will reload, no error to show
      if (err instanceof Error && err.message === "REDIRECTING") return;
      // Show actual error for debugging
      const msg = err instanceof Error ? err.message : t.signInFail;
      console.error("[Reviews] Sign-in error:", err);
      setError(`${t.signInFail} (${msg})`);
    } finally {
      setSigningIn(false);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
    setError(null);
    setSubmitting(true);
    try {
      await submitReview(user, rating, comment);
      setSuccess(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : t.submitFail);
    } finally {
      setSubmitting(false);
    }
  };

  if (!ready) {
    return (
      <div className="grid h-full min-h-[220px] place-items-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-5">
        <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5 text-center">
        <p className="text-sm font-black text-slate-900">{t.shareExperience}</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          {t.signInBody}
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          disabled={signingIn}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#06291f] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-green disabled:opacity-60"
        >
          {signingIn ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          {t.signInWithGoogle}
        </button>
        {error && <p className="mt-2 text-[11px] font-semibold text-red-600">{error}</p>}
      </div>
    );
  }

  const displayRating = hoverRating || rating;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={user.displayName || "You"} photoUrl={user.photoURL} />
          <div>
            <p className="text-xs font-bold text-slate-900">{user.displayName}</p>
            <p className="text-[10px] text-slate-500">{t.signedInWith}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOutOfReviews()}
          aria-label={t.signOut}
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-600"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>

      {success ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm font-black text-brand-green">{t.thankYou}</p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-2 text-[11px] font-bold text-slate-500 underline"
          >
            {t.editReview}
          </button>
        </div>
      ) : loadingExisting ? (
        <div className="grid flex-1 place-items-center">
          <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
        </div>
      ) : (
        <>
          <p className="mb-2 text-xs font-bold text-slate-700">{t.yourRating}</p>
          <div
            className="mb-3 flex gap-1"
            onMouseLeave={() => setHoverRating(0)}
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onMouseEnter={() => setHoverRating(value)}
                onClick={() => setRating(value)}
                aria-label={`${value} ${value > 1 ? t.stars : t.star}`}
                className="p-0.5"
              >
                <Star
                  className={`h-6 w-6 transition ${
                    value <= displayRating ? "fill-amber-400 text-amber-400" : "fill-none text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value.slice(0, 600))}
            placeholder={t.reviewPlaceholder}
            rows={3}
            className="w-full flex-1 resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs leading-5 text-slate-700 outline-none focus:border-brand-green"
          />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-[10px] text-slate-400">{comment.length}/600</span>
          </div>
          {error && <p className="mt-1 text-[11px] font-semibold text-red-600">{error}</p>}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={submitting || rating === 0 || comment.trim().length < 2}
            className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-green-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitting ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
            {t.postReview}
          </button>
        </>
      )}
    </div>
  );
}

export function ReviewsSection() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const { reviews, loading, count, average } = useReviews(12);
  const [showForm, setShowForm] = useState(false);
  const roundedAverage = useMemo(() => Math.round(average * 10) / 10, [average]);

  // Complete mobile redirect sign-in when returning from Google.
  // Must run at section level (always mounted) — WriteReviewCard only mounts
  // when the form is open, so the redirect result would be lost otherwise.
  useEffect(() => {
    handleRedirectResult()
      .then((user) => {
        if (user) setShowForm(true); // auto-open form after successful sign-in
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const scriptId = "reviews-structured-data";
    document.getElementById(scriptId)?.remove();
    if (count === 0) return;
    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Ride Bangla Limited",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: roundedAverage.toString(),
        reviewCount: count.toString(),
      },
    });
    document.head.appendChild(script);
    return () => script.remove();
  }, [count, roundedAverage]);

  return (
    <section
      className="bg-white bg-cover bg-top bg-no-repeat px-5 py-8 sm:px-8 lg:py-10"
      style={{ backgroundImage: "url('/assets/home/reviews-bg.jpg')" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black tracking-[-.03em] text-[#06291f] sm:text-3xl">{t.heading}</h2>
            <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">{t.subheading}</p>
          </div>
          <div className="flex items-center gap-2">
            {count > 0 && (
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5">
                <StarRow value={Math.round(average)} size="h-3 w-3" />
                <span className="text-[10px] font-black text-slate-700">{roundedAverage.toFixed(1)} · {count}</span>
              </div>
            )}
            <button type="button" onClick={() => setShowForm((value) => !value)} className="inline-flex items-center gap-1.5 rounded-full bg-[#0b7a3b] px-5 py-2.5 text-xs font-black text-white shadow-lg shadow-emerald-900/20 transition hover:bg-[#075e2e] hover:shadow-xl hover:scale-105 active:scale-95">
              <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
              {showForm ? t.closeReview : t.writeReview}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-5 max-w-xl">
            <WriteReviewCard />
          </div>
        )}

        {loading ? (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-xl bg-slate-50" />)}
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-5 py-8 text-center">
            <p className="text-xs text-slate-500">{t.noReviews}</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {reviews.slice(0, 4).map((review) => <ReviewCard key={review.id} review={review} />)}
          </div>
        )}

        <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
          {Array.from({ length: Math.max(1, Math.min(5, Math.ceil(Math.max(reviews.length, 1) / 4))) }).map((_, index) => (
            <span key={index} className={`h-1.5 w-1.5 rounded-full ${index === 0 ? "bg-[#ed1c24]" : "bg-[#86c7aa]"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
