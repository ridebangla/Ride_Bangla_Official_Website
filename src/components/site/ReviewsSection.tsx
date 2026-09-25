import { useEffect, useMemo, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { LogOut, Loader2, Star } from "lucide-react";
import {
  getOwnReview,
  signInToReview,
  signOutOfReviews,
  submitReview,
  useReviewAuthUser,
  useReviews,
  type Review,
} from "@/lib/reviews";

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
          Verified Google Account
        </span>
        {timeAgo && <span>{timeAgo}</span>}
      </div>
    </div>
  );
}

function WriteReviewCard() {
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
    } catch {
      setError("Sign-in was cancelled or failed. Please try again.");
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
      setError(submitError instanceof Error ? submitError.message : "Could not submit your review.");
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
        <p className="text-sm font-black text-slate-900">Share your experience</p>
        <p className="mt-1 text-xs leading-5 text-slate-500">
          Sign in with your Google account to leave a real, verified review. One account, one honest review — no fake ratings.
        </p>
        <button
          type="button"
          onClick={handleSignIn}
          disabled={signingIn}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#06291f] px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-brand-green disabled:opacity-60"
        >
          {signingIn ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Sign in with Google
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
            <p className="text-[10px] text-slate-500">Signed in with Google</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOutOfReviews()}
          aria-label="Sign out"
          className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 transition hover:bg-white hover:text-slate-600"
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>

      {success ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-sm font-black text-brand-green">Thank you! Your review is live.</p>
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="mt-2 text-[11px] font-bold text-slate-500 underline"
          >
            Edit your review
          </button>
        </div>
      ) : loadingExisting ? (
        <div className="grid flex-1 place-items-center">
          <Loader2 className="h-5 w-5 animate-spin text-slate-300" />
        </div>
      ) : (
        <>
          <p className="mb-2 text-xs font-bold text-slate-700">Your rating</p>
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
                aria-label={`${value} star${value > 1 ? "s" : ""}`}
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
            placeholder="Tell others about your experience with Ride Bangla..."
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
            Post Review
          </button>
        </>
      )}
    </div>
  );
}

export function ReviewsSection() {
  const { reviews, loading, count, average } = useReviews(12);

  const roundedAverage = useMemo(() => Math.round(average * 10) / 10, [average]);

  // Lightweight AggregateRating structured data so real reviews can be
  // reflected to Google, once there is at least one review to report.
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
    <section className="px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-black tracking-[-.03em] text-[#06291f] sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-sm text-slate-500">Real reviews from real, Google-verified customers.</p>
          </div>
          {count > 0 && (
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
              <span className="text-2xl font-black text-slate-900">{roundedAverage.toFixed(1)}</span>
              <div>
                <StarRow value={Math.round(average)} size="h-3.5 w-3.5" />
                <p className="text-[11px] font-bold text-slate-500">{count} review{count === 1 ? "" : "s"}</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1 lg:row-span-2">
            <WriteReviewCard />
          </div>

          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-40 animate-pulse rounded-2xl border border-slate-100 bg-slate-50" />
            ))
          ) : reviews.length === 0 ? (
            <div className="flex items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center sm:col-span-2 lg:col-span-3">
              <p className="text-sm text-slate-500">
                No reviews yet — be the first Ride Bangla customer to share your experience.
              </p>
            </div>
          ) : (
            reviews.map((review) => <ReviewCard key={review.id} review={review} />)
          )}
        </div>
      </div>
    </section>
  );
}
