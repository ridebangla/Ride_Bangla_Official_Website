import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Heart,
  Loader2,
  MessageCircle,
  Send,
  Share2,
  Video,
} from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import { SafeMediaImage } from "@/components/site/SafeMediaImage";
import { UpdatesSpotlight } from "@/components/site/UpdatesSpotlight";
import {
  likeUpdate,
  submitUpdateComment,
} from "@/lib/website-data";
import {
  subscribeToApprovedCommentCount,
  subscribeToUpdateLikeCount,
  useRealtimeWebsiteUpdates,
} from "@/lib/realtime-updates";
import { useLanguage } from "@/context/LanguageContext";

const copy = {
  en: {
    headerTitle: "Updates",
    headerSubtitle: "News and product announcements from the Ride Bangla team.",
    loadingUpdates: "Loading latest updates...",
    loadError: "Updates could not be loaded. Please try again later.",
    emptyUpdates: "No updates yet. Check back soon.",
    badgeImageVideo: "Image + Video",
    badgeVideo: "Video",
    badgeImage: "Image",
    badgeText: "Text",
    openVideo: "Open Video",
    learnMore: "Learn more",
    likeBtn: "Like",
    commentBtn: "Comment",
    shareBtn: "Share",
    copied: "Copied",
    nameCommentRequired: "Please write your name and comment.",
    commentSuccess: "Comment submitted. It will appear after admin approval.",
    commentError: "Could not submit comment. Please try again.",
    namePlaceholder: "Your name",
    emailPlaceholder: "Email (optional)",
    commentPlaceholder: "Write your comment...",
    submitting: "Submitting...",
    submitComment: "Submit Comment",
    videoNotSupported: "Your browser does not support video playback.",
    videoUpdate: "Video update",
    videoDirectLink:
      "Use the direct link if playback is unavailable in your browser.",
    shareSuffix: "Ride Bangla Updates",
  },
  bn: {
    headerTitle: "আপডেট",
    headerSubtitle: "Ride Bangla টিমের খবর ও প্রোডাক্ট ঘোষণা।",
    loadingUpdates: "সর্বশেষ আপডেট লোড হচ্ছে…",
    loadError:
      "আপডেট লোড করা যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।",
    emptyUpdates: "এখনো কোনো আপডেট নেই। শীঘ্রই আবার দেখুন।",
    badgeImageVideo: "ছবি + ভিডিও",
    badgeVideo: "ভিডিও",
    badgeImage: "ছবি",
    badgeText: "লেখা",
    openVideo: "ভিডিও খুলুন",
    learnMore: "আরও জানুন",
    likeBtn: "লাইক",
    commentBtn: "কমেন্ট",
    shareBtn: "শেয়ার",
    copied: "কপি হয়েছে",
    nameCommentRequired: "অনুগ্রহ করে আপনার নাম ও কমেন্ট লিখুন।",
    commentSuccess:
      "কমেন্ট জমা দেওয়া হয়েছে। অ্যাডমিন অনুমোদনের পর এটি দেখা যাবে।",
    commentError:
      "কমেন্ট জমা দেওয়া যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
    namePlaceholder: "আপনার নাম",
    emailPlaceholder: "ইমেইল (ঐচ্ছিক)",
    commentPlaceholder: "আপনার কমেন্ট লিখুন…",
    submitting: "জমা দেওয়া হচ্ছে…",
    submitComment: "কমেন্ট জমা দিন",
    videoNotSupported: "আপনার ব্রাউজার ভিডিও প্লেব্যাক সাপোর্ট করে না।",
    videoUpdate: "ভিডিও আপডেট",
    videoDirectLink:
      "আপনার ব্রাউজারে প্লেব্যাক না চললে সরাসরি লিংক ব্যবহার করুন।",
    shareSuffix: "Ride Bangla আপডেট",
  },
};

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Updates — Latest News & Announcements" },
      {
        name: "description",
        content:
          "Stay updated with the latest Ride Bangla news, product launches, service announcements, feature updates and company milestones from across Bangladesh.",
      },
      { property: "og:title", content: "Ride Bangla Updates — Latest News & Announcements" },
      {
        property: "og:description",
        content:
          "Latest Ride Bangla news, product launches, service announcements and company milestones.",
      },
      { property: "og:url", content: "https://ridebangla.bd/updates" },
    ],
    links: [
      { rel: "canonical", href: "https://ridebangla.bd/updates" },
      { rel: "alternate", hreflang: "en", href: "https://ridebangla.bd/updates" },
      { rel: "alternate", hreflang: "bn", href: "https://ridebangla.bd/updates?lang=bn" },
      { rel: "alternate", hreflang: "x-default", href: "https://ridebangla.bd/updates" },
    ],
  }),
  component: UpdatesPage,
});

type UpdateItem = import("@/lib/website-data").WebsiteUpdate;

function cleanUrl(url: string | null) {
  return url?.trim() || "";
}

function getUpdateText(update: UpdateItem, language: "en" | "bn") {
  const english = update.body?.trim() || update.excerpt?.trim() || "";
  const bangla = update.body_bn?.trim() || update.excerpt_bn?.trim() || "";
  return language === "bn" ? bangla || english : english || bangla;
}

function getUpdateDate(update: UpdateItem) {
  return update.published_at || update.created_at || update.updated_at || "";
}

function formatUpdateDate(value: string, locale: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString(locale);
}

function UpdatesPage() {
  const { language, pick } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const { updates, loading: isLoading, error } = useRealtimeWebsiteUpdates(100);

  useEffect(() => {
    if (isLoading || updates.length === 0 || typeof window === "undefined") return;
    const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (!id) return;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [isLoading, updates]);

  return (
    <SiteLayout>
      <PageHeader
        title={t.headerTitle}
        subtitle={t.headerSubtitle}
      />

      <section className="mx-auto max-w-6xl px-4 py-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">
            {t.loadingUpdates}
          </p>
        ) : error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
            {t.loadError}
          </p>
        ) : !updates || updates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {t.emptyUpdates}
          </p>
        ) : (
          <>
            <UpdatesSpotlight
              updates={updates}
              language={language}
              pick={pick}
              onOpen={(id) => {
                document
                  .getElementById(`update-${id}`)
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {updates.map((update) => {
              const updateDate = getUpdateDate(update);
              const formattedUpdateDate = formatUpdateDate(
                updateDate,
                language === "bn" ? "bn-BD" : "en-US",
              );
              const updateText = getUpdateText(update, language);
              const imageUrl = cleanUrl(update.image_url);
              const videoUrl = cleanUrl(update.video_url);
              const hasImage = Boolean(imageUrl);
              const hasVideo = Boolean(videoUrl);
              const hasAnyMedia = hasImage || hasVideo;

              return (
                <article
                  id={`update-${update.id}`}
                  key={update.id}
                  className="scroll-mt-24 overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                >
                  {hasAnyMedia ? (
                    <div className="space-y-4 bg-white p-3 sm:p-4">
                      {hasImage ? (
                        <div className="overflow-hidden rounded-2xl border border-border bg-white">
                          <SafeMediaImage
                            src={imageUrl}
                            alt={pick(update.title, update.title_bn)}
                            loading="lazy"
                            decoding="async"
                            className="block h-48 w-full object-cover sm:h-56"
                          />
                        </div>
                      ) : null}

                      {hasVideo ? (
                        <VideoBlock title={pick(update.title, update.title_bn)} videoUrl={videoUrl} />
                      ) : null}
                    </div>
                  ) : null}

                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      {update.category ? (
                        <span className="rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-brand-orange">
                          {update.category}
                        </span>
                      ) : null}

                      <span className="rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                        {hasImage && hasVideo
                          ? t.badgeImageVideo
                          : hasVideo
                            ? t.badgeVideo
                            : hasImage
                              ? t.badgeImage
                              : update.media_type || t.badgeText}
                      </span>
                    </div>

                    <h2 className="mt-4 text-lg font-bold leading-snug text-foreground sm:text-xl">
                      {pick(update.title, update.title_bn)}
                    </h2>

                    {(language === "bn" ? update.body_bn || update.excerpt_bn || updateText : updateText) ? (
                      <div className="mt-3 line-clamp-4 whitespace-pre-line break-words text-sm leading-6 text-muted-foreground">
                        {language === "bn" ? update.body_bn || update.excerpt_bn || updateText : updateText}
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      {formattedUpdateDate ? (
                        <time className="text-xs font-medium text-muted-foreground">
                          {formattedUpdateDate}
                        </time>
                      ) : (
                        <span />
                      )}

                      <div className="flex flex-wrap items-center gap-3">
                        {hasVideo ? (
                          <a
                            href={videoUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
                          >
                            {t.openVideo} <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}

                        {update.external_url ? (
                          <a
                            href={update.external_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
                          >
                            {t.learnMore} <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <UpdateEngagement update={update} />
                  </div>
                </article>
              );
            })}
            </div>
          </>
        )}
      </section>
    </SiteLayout>
  );
}

function UpdateEngagement({ update }: { update: UpdateItem }) {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const unsubscribeLikes = subscribeToUpdateLikeCount(update.id, setLikeCount);
    const unsubscribeComments = subscribeToApprovedCommentCount(update.id, setCommentCount);
    return () => {
      unsubscribeLikes();
      unsubscribeComments();
    };
  }, [update.id]);

  const likeMutation = useMutation({
    mutationFn: async () => {
      await likeUpdate(update.id);
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      const name = commentName.trim();
      const email = commentEmail.trim();
      const comment = commentText.trim();

      if (!name || !comment) {
        throw new Error(t.nameCommentRequired);
      }

      await submitUpdateComment({
        updateId: update.id,
        name,
        email: email || null,
        comment,
      });
    },
    onSuccess: () => {
      setCommentName("");
      setCommentEmail("");
      setCommentText("");
      setCommentMessage(t.commentSuccess);
      setShowCommentForm(false);
    },
    onError: (error) => {
      setCommentMessage(
        error instanceof Error ? error.message : t.commentError
      );
    },
  });

  const getShareUrl = () => {
    if (typeof window === "undefined") return "https://ridebangla.bd/updates";
    return `${window.location.origin}/updates#update-${encodeURIComponent(update.id)}`;
  };

  const shareUpdate = async () => {
    const shareUrl = getShareUrl();
    const shareText = `${update.title} - ${t.shareSuffix}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: update.title,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        setCopied(false);
      }
    }
  };

  return (
    <div className="mt-6 border-t border-border pt-5">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => likeMutation.mutate()}
          disabled={likeMutation.isPending}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green disabled:opacity-60"
        >
          {likeMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className="h-4 w-4" />
          )}
          {t.likeBtn} {likeCount > 0 ? `(${likeCount})` : ""}
        </button>

        <button
          type="button"
          onClick={() => setShowCommentForm((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
        >
          <MessageCircle className="h-4 w-4" />
          {t.commentBtn} {commentCount > 0 ? `(${commentCount})` : ""}
        </button>

        <button
          type="button"
          onClick={shareUpdate}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
        >
          {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? t.copied : t.shareBtn}
        </button>
      </div>

      {commentMessage ? (
        <div className="mt-4 flex items-start gap-2 rounded-2xl border border-brand-green/20 bg-brand-green-soft px-4 py-3 text-sm font-semibold text-brand-green">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{commentMessage}</span>
        </div>
      ) : null}

      {showCommentForm ? (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setCommentMessage("");
            commentMutation.mutate();
          }}
          className="mt-4 rounded-2xl border border-border bg-background p-4"
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={commentName}
              onChange={(event) => setCommentName(event.target.value)}
              placeholder={t.namePlaceholder}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-green"
              maxLength={100}
            />

            <input
              value={commentEmail}
              onChange={(event) => setCommentEmail(event.target.value)}
              placeholder={t.emailPlaceholder}
              type="email"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-green"
              maxLength={255}
            />
          </div>

          <textarea
            value={commentText}
            onChange={(event) => {
              setCommentText(event.target.value);
              event.currentTarget.style.height = "auto";
              event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 480)}px`;
            }}
            placeholder={t.commentPlaceholder}
            className="mt-3 min-h-28 max-h-[30rem] w-full resize-none overflow-y-auto rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-green"
            maxLength={2000}
          />

          <button
            type="submit"
            disabled={commentMutation.isPending}
            className="mt-3 inline-flex items-center gap-2 rounded-xl bg-brand-green px-5 py-3 text-sm font-bold text-white transition hover:bg-brand-green-dark disabled:opacity-60"
          >
            {commentMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            {commentMutation.isPending ? t.submitting : t.submitComment}
          </button>
        </form>
      ) : null}
    </div>
  );
}

function getYouTubeEmbedUrl(videoUrl: string) {
  try {
    const url = new URL(videoUrl);
    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let videoId = "";

    if (host === "youtu.be") {
      videoId = url.pathname.split("/").filter(Boolean)[0] || "";
    } else if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") videoId = url.searchParams.get("v") || "";
      if (url.pathname.startsWith("/shorts/")) videoId = url.pathname.split("/")[2] || "";
      if (url.pathname.startsWith("/embed/")) videoId = url.pathname.split("/")[2] || "";
    }

    return /^[A-Za-z0-9_-]{6,20}$/.test(videoId)
      ? `https://www.youtube-nocookie.com/embed/${videoId}`
      : null;
  } catch {
    return null;
  }
}

function VideoBlock({ title, videoUrl }: { title: string; videoUrl: string }) {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);

  return (
    <div className="overflow-hidden rounded-2xl bg-black">
      {youtubeEmbedUrl ? (
        <div className="aspect-video w-full">
          <iframe
            src={youtubeEmbedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      ) : (
        <video
          controls
          playsInline
          preload="metadata"
          className="h-auto max-h-[80rem] min-h-[220px] w-full bg-black object-contain"
        >
          <source src={videoUrl} />
          {t.videoNotSupported}
        </video>
      )}

      <div className="border-t border-white/10 bg-black p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-white">
            <Video className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
            <div>
              <p className="text-sm font-semibold">{t.videoUpdate}</p>
              <p className="mt-1 text-xs leading-5 text-white/65">
                {t.videoDirectLink}
              </p>
            </div>
          </div>

          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${t.openVideo}: ${title}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-white/90"
          >
            {t.openVideo}
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

