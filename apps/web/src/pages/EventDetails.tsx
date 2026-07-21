import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import client from "../api/client";
import { getCategoryStyles } from "../data/eventColors";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

export default function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const styles = event ? getCategoryStyles(event.tag) : { bg: "", text: "", border: "" };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = "/logo/fallback-logo.jpg";
  };

  useEffect(() => {
    setLoading(true);
    setNotFound(false);
    client
      .get("/events")
      .then((res) => {
        const all = [...res.data.upcoming, ...res.data.past];
        const match = all.find((e: any) => e._id === id);
        if (match) {
          setEvent(match);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <motion.main {...pageTransition} className="pt-32">
      <section className="mx-auto max-w-4xl px-6 pb-28">
        <Link
          to="/events"
          className="inline-flex items-center gap-1 font-mono text-xs text-ink-muted hover:text-ink-primary"
        >
          <ArrowLeft size={14} /> back to events
        </Link>

        {loading ? (
          <p className="mt-10 text-sm text-ink-muted">Loading event...</p>
        ) : notFound ? (
          <div className="mt-10">
            <h1 className="font-display text-2xl font-semibold">Event not found</h1>
            <p className="mt-3 text-sm text-ink-muted">
              This event may have been removed or the link is incorrect.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-8 overflow-hidden rounded-2xl border border-bordersubtle">
              <div className="relative h-64 md:h-80">
                <img
                  src={event.image || "/logo/fallback-logo.jpg"}
                  alt={event.title}
                  onError={handleImageError}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                <span className={`eyebrow absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] border font-semibold ${styles.bg} ${styles.text} ${styles.border} backdrop-blur-md`}>
                  {event.tag}
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <Calendar size={13} /> {event.date}
                </div>
                <h1 className="mt-3 font-display text-3xl font-semibold text-ink-primary">
                  {event.title}
                </h1>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                  {event.description}
                </p>

                <div className="mt-8 rounded-xl border border-bordersubtle bg-void/40 p-6 text-center">
                  <p className="eyebrow text-xs text-accent-secondary">// registration</p>
                  <h2 className="mt-3 font-display text-xl font-semibold">
                    Register for this event
                  </h2>
                  <p className="mt-2 text-sm text-ink-muted">
                    Registration links go live on our socials and this page
                    two weeks before each event. Follow us so you don't miss
                    the form.
                  </p>
                  <a
                    href="/contact"
                    className="mt-5 inline-block rounded-full bg-grad-signal px-6 py-3 text-sm font-medium text-void"
                  >
                    Get notified
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </motion.main>
  );
}
