import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  Heart,
  ImageIcon,
  Loader2,
  MessageCircle,
  PlayCircle,
  Send,
  Share2,
  Video,
} from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/layout/SiteLayout";
import {
  countUpdateComments,
  countUpdateLikes,
  getWebsiteUpdates,
  likeUpdate,
  submitUpdateComment,
} from "@/lib/website-data";

export const Route = createFileRoute("/updates")({
  head: () => ({
    meta: [
      { title: "Ride Bangla Updates — Latest News & Announcements" },
      {
        name: "description",
        content:
          "Latest news, product updates and announcements from Ride Bangla.",
      },
    ],
    links: [{ rel: "canonical", href: "/updates" }],
  }),
  component: UpdatesPage,
});

type UpdateItem = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  body: string | null;
  category: string | null;
  media_type: string | null;
  image_url: string | null;
  video_url: string | null;
  external_url: string | null;
  published: boolean | null;
  published_at: string | null;
  created_at: string | null;
  updated_at: string | null;
};

function cleanUrl(url: string | null) {
  return url?.trim() || "";
}

function getUpdateText(update: UpdateItem) {
  return update.body?.trim() || update.excerpt?.trim() || "";
}

function getUpdateDate(update: UpdateItem) {
  return update.published_at || update.created_at || update.updated_at || "";
}

function UpdatesPage() {
  const { data: updates, isLoading, error } = useQuery({
    queryKey: ["website_updates", "published", "full"],
    retry: false,
    staleTime: 0,
    queryFn: async () => getWebsiteUpdates(),
  });

  return (
    <SiteLayout>
      <PageHeader
        title="Updates"
        subtitle="News and product announcements from the Ride Bangla team."
      />

      <section className="mx-auto max-w-5xl px-4 py-10">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">
            Loading latest updates...
          </p>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              Updates could not be loaded.
            </p>
            <p className="mt-1 text-xs text-red-600">
              {(error as Error).message}
            </p>
          </div>
        ) : !updates || updates.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No updates yet. Check back soon.
          </p>
        ) : (
          <div className="space-y-8">
            {updates.map((update) => {
              const updateDate = getUpdateDate(update);
              const updateText = getUpdateText(update);
              const imageUrl = cleanUrl(update.image_url);
              const videoUrl = cleanUrl(update.video_url);
              const hasImage = Boolean(imageUrl);
              const hasVideo = Boolean(videoUrl);
              const hasAnyMedia = hasImage || hasVideo;

              return (
                <article
                  key={update.id}
                  className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
                >
                  {hasAnyMedia ? (
                    <div className="space-y-4 bg-white p-3 sm:p-4">
                      {hasImage ? (
                        <div className="overflow-hidden rounded-2xl border border-border bg-white">
                          <img
                            src={imageUrl}
                            alt={update.title}
                            loading="lazy"
                            className="block h-auto w-full object-contain"
                          />
                        </div>
                      ) : null}

                      {hasVideo ? (
                        <VideoBlock title={update.title} videoUrl={videoUrl} />
                      ) : null}
                    </div>
                  ) : (
                    <div className="flex min-h-[260px] w-full items-center justify-center bg-brand-green-soft text-brand-green">
                      {update.media_type === "image" ? (
                        <ImageIcon className="h-14 w-14 opacity-60" />
                      ) : (
                        <PlayCircle className="h-14 w-14 opacity-60" />
                      )}
                    </div>
                  )}

                  <div className="p-5 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-orange-soft px-3 py-1 text-xs font-semibold text-brand-orange">
                        {update.category || "Announcement"}
                      </span>

                      <span className="rounded-full bg-brand-green-soft px-3 py-1 text-xs font-semibold text-brand-green">
                        {hasImage && hasVideo
                          ? "Image + Video"
                          : hasVideo
                            ? "Video"
                            : hasImage
                              ? "Image"
                              : update.media_type || "Text"}
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold leading-snug text-foreground">
                      {update.title}
                    </h2>

                    {updateText ? (
                      <div className="mt-4 whitespace-pre-line break-words text-base leading-8 text-muted-foreground">
                        {updateText}
                      </div>
                    ) : null}

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      {updateDate ? (
                        <time className="text-xs font-medium text-muted-foreground">
                          {new Date(updateDate).toLocaleDateString()}
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
                            Open Video <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}

                        {update.external_url ? (
                          <a
                            href={update.external_url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-green hover:underline"
                          >
                            Learn more <ExternalLink className="h-3.5 w-3.5" />
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
        )}
      </section>
    </SiteLayout>
  );
}

function UpdateEngagement({ update }: { update: UpdateItem }) {
  const queryClient = useQueryClient();
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [copied, setCopied] = useState(false);
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [commentMessage, setCommentMessage] = useState("");

  const { data: likeCount = 0 } = useQuery({
    queryKey: ["website_update_likes_count", update.id],
    queryFn: async () => countUpdateLikes(update.id),
  });

  const { data: commentCount = 0 } = useQuery({
    queryKey: ["website_update_comments_count", update.id],
    queryFn: async () => countUpdateComments(update.id),
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      await likeUpdate(update.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["website_update_likes_count", update.id],
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      const name = commentName.trim();
      const email = commentEmail.trim();
      const comment = commentText.trim();

      if (!name || !comment) {
        throw new Error("Please write your name and comment.");
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
      setCommentMessage(
        "Comment submitted. It will appear after admin approval."
      );
      setShowCommentForm(false);
    },
    onError: (error) => {
      setCommentMessage(
        error instanceof Error
          ? error.message
          : "Could not submit comment. Please try again."
      );
    },
  });

  const getShareUrl = () => {
    if (typeof window === "undefined") return "https://ridebangla.bd/updates";
    return `${window.location.origin}/updates`;
  };

  const shareUpdate = async () => {
    const shareUrl = getShareUrl();
    const shareText = `${update.title} - Ride Bangla Updates`;

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
          Like {likeCount > 0 ? `(${likeCount})` : ""}
        </button>

        <button
          type="button"
          onClick={() => setShowCommentForm((current) => !current)}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
        >
          <MessageCircle className="h-4 w-4" />
          Comment {commentCount > 0 ? `(${commentCount})` : ""}
        </button>

        <button
          type="button"
          onClick={shareUpdate}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition hover:border-brand-green hover:text-brand-green"
        >
          {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? "Copied" : "Share"}
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
              placeholder="Your name"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-green"
              maxLength={120}
            />

            <input
              value={commentEmail}
              onChange={(event) => setCommentEmail(event.target.value)}
              placeholder="Email (optional)"
              type="email"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-green"
              maxLength={255}
            />
          </div>

          <textarea
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            placeholder="Write your comment..."
            className="mt-3 min-h-28 w-full resize-y rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-green"
            maxLength={1500}
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
            {commentMutation.isPending ? "Submitting..." : "Submit Comment"}
          </button>
        </form>
      ) : null}
    </div>
  );
}

function VideoBlock({ title, videoUrl }: { title: string; videoUrl: string }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-black">
      <video
        controls
        playsInline
        preload="metadata"
        className="h-auto max-h-[780px] min-h-[260px] w-full bg-black object-contain"
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} />
        Your browser does not support video playback.
      </video>

      <div className="border-t border-white/10 bg-black p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 text-white">
            <Video className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
            <div>
              <p className="text-sm font-semibold">Video update</p>
              <p className="mt-1 text-xs leading-5 text-white/65">
                If the video does not play in your browser, open it directly.
              </p>
            </div>
          </div>

          <a
            href={videoUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Open video: ${title}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black transition hover:bg-white/90"
          >
            Open Video
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
                         }
