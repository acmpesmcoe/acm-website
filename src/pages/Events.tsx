import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import EventCard from "../components/EventCard";
import { useEffect, useState } from "react";
import client from "../api/client";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

const galleryPhotos = [
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
];

export default function Events() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [pastEvents, setPastEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get("/events")
      .then((res) => {
        setUpcomingEvents(res.data.upcoming);
        setPastEvents(res.data.past);
      })
      .finally(() => setLoading(false));
  }, []);

  const list = tab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <motion.main {...pageTransition} className="pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// events</p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Everything we <span className="text-gradient">run and ship.</span>
          </h1>
          <p className="mt-6 max-w-xl text-ink-muted">
            Hackathons, workshops, and talks — browse what's coming up or look
            back at what the chapter has already pulled off.
          </p>
        </ScrollReveal>

        <div className="mt-10 inline-flex rounded-full border border-bordersubtle bg-surface p-1">
          {(["upcoming", "past"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`relative rounded-full px-5 py-2 font-mono text-sm transition-colors ${
                tab === t ? "text-void" : "text-ink-muted hover:text-ink-primary"
              }`}
            >
              {tab === t && (
                <motion.span
                  layoutId="event-tab"
                  className="absolute inset-0 rounded-full bg-grad-signal"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{t === "upcoming" ? "Upcoming" : "Past events"}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-6 md:grid-cols-3"
          >
            {loading ? (
  <p className="col-span-3 text-sm text-ink-muted">Loading events...</p>
) : list.length === 0 ? (
  <p className="col-span-3 text-sm text-ink-muted">No events yet — check back soon.</p>
) : (
  list.map((e, i) => (
              <div key={e._id}>
                <EventCard event={e} index={i} />
                {tab === "upcoming" && (
                  <a
                    href="#register"
                    className="mt-3 inline-block font-mono text-xs text-accent-warm hover:underline"
                  >
                    register now →
                  </a>
                )}
              </div>
            )))}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// event_gallery</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">Event gallery</h2>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {galleryPhotos.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="group overflow-hidden rounded-xl"
            >
              <img
                src={p}
                alt="Event gallery"
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="register" className="mx-auto max-w-4xl px-6 pb-28">
        <ScrollReveal>
          <div className="rounded-2xl border border-bordersubtle bg-surface p-8 text-center">
            <p className="eyebrow text-xs text-accent-secondary">// registration</p>
            <h2 className="mt-4 font-display text-2xl font-semibold">Register for an event</h2>
            <p className="mt-3 text-sm text-ink-muted">
              Registration links go live on our socials and this page two
              weeks before each event. Follow us so you don't miss the form.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block rounded-full bg-grad-signal px-6 py-3 text-sm font-medium text-void"
            >
              Get notified
            </a>
          </div>
        </ScrollReveal>
      </section>
    </motion.main>
  );
}
