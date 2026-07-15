import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code2, Users2, Rocket, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import NetworkCanvas from "../components/NetworkCanvas";
import ScrollReveal from "../components/ScrollReveal";
import AnimatedCounter from "../components/AnimatedCounter";
import EventCard from "../components/EventCard";
import TiltCard from "../components/TiltCard";
import client from "../api/client";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

const whyJoin = [
  { icon: Code2, title: "Build real things", desc: "Ship projects, hackathon entries, and open-source contributions with people who care about craft." },
  { icon: Users2, title: "Find your people", desc: "A community of engineers who'd rather debug together than alone at 2am." },
  { icon: Rocket, title: "Move faster", desc: "Workshops, mentorship, and talks that compress years of trial-and-error into weeks." },
  { icon: Sparkles, title: "Get recognized", desc: "Represent PES MCOE at ACM events, contests, and the wider computing community." },
];

const photos = [
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
];

export default function Home() {
  const [stats, setStats] = useState<{ value: number; suffix: string; label: string }[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);

  useEffect(() => {
    client.get("/events").then((res) => {
      setUpcomingEvents(res.data.upcoming.slice(0, 3));
    }).catch(() => {});

    client.get("/team").then((res) => {
      const total = res.data.faculty.length + res.data.core.length;
      setStats([
        { value: total, suffix: "+", label: "active members" },
        { value: res.data.core.length, suffix: "", label: "core team" },
        { value: res.data.faculty.length, suffix: "", label: "faculty mentors" },
        { value: new Date().getFullYear() - 2022, suffix: "", label: "years running" },
      ]);
    }).catch(() => {});
  }, []);

  return (
    <motion.main {...pageTransition}>
      <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
        >
          <source src="/video/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-white/95 dark:bg-black/75 z-10" />

        {/* Interactive network canvas layered on top of video overlay */}
        <div className="absolute inset-0 z-20">
          <NetworkCanvas />
        </div>
 
        <div className="relative z-30 mx-auto max-w-6xl px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="eyebrow inline-block rounded-full border border-bordersubtle bg-surface/60 px-4 py-1.5 text-xs text-accent-secondary"
          >
            // association_for_computing_machinery
          </motion.p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.1] tracking-tight md:text-7xl">
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="block"
              >
                Where PES MCOE
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.45, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-gradient block"
              >
                compiles its coders.
              </motion.span>
            </div>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg text-ink-muted"
          >
            The official student chapter of ACM at PES Modern College of
            Engineering. Hackathons, workshops, and a network of people who
            build for the love of it.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/contact"
              className="group flex items-center gap-2 rounded-full bg-ink-primary px-6 py-3 text-sm font-medium text-void transition-transform hover:scale-105 shadow-sm"
            >
              Join ACM <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/events"
              className="rounded-full border border-bordersubtle bg-surface2/30 px-6 py-3 text-sm font-medium text-ink-primary transition-colors hover:border-accent-primary"
            >
              See upcoming events
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] text-ink-faint z-30"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          scroll ↓
        </motion.div>
      </section>
 
      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// about_acm</p>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold md:text-4xl">
            ACM is the world's largest computing society —
            <span className="text-ink-muted"> our chapter is its local runtime.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-ink-muted">
            Founded in 1947, the Association for Computing Machinery connects
            students, educators, and professionals across the world. Our
            chapter at PES MCOE brings that global network to Pune: peer
            learning, technical events, and a straight line into the wider
            computing community.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// why_join</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">Why students join</h2>
        </ScrollReveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {whyJoin.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 0.08}>
              <TiltCard className="h-full">
                <div className="group rounded-2xl border border-bordersubtle bg-surface p-6 transition-colors hover:border-accent-primary/50 h-full">
                  <item.icon className="text-accent-secondary" size={22} />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-primary">{item.title}</h3>
                  <p className="mt-2 text-sm text-ink-muted leading-relaxed">{item.desc}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <ScrollReveal>
          <div className="flex items-end justify-between">
            <div>
              <p className="eyebrow text-xs text-accent-secondary">// upcoming</p>
              <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">What's next</h2>
            </div>
            <Link to="/events" className="hidden font-mono text-sm text-accent-secondary hover:underline md:inline">
              all events →
            </Link>
          </div>
        </ScrollReveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {upcomingEvents.map((e, i) => (
            <EventCard key={e._id} event={e} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="rounded-3xl border border-bordersubtle bg-surface/60 px-8 py-14">
            <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
              {stats.map((s) => (
                <AnimatedCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// gallery</p>
          <h2 className="mt-4 font-display text-3xl font-semibold md:text-4xl">Moments from the chapter</h2>
        </ScrollReveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {photos.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group overflow-hidden rounded-xl"
            >
              <img
                src={p}
                alt="ACM chapter event"
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl bg-grad-signal px-8 py-16 text-center">
            <h2 className="font-display text-3xl font-semibold text-void md:text-4xl">
              Ready to write your first line for the chapter?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-void/80">
              Membership is open to all PES MCOE students, any year, any branch.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-void px-7 py-3 text-sm font-medium text-ink-primary transition-transform hover:scale-105"
            >
              Join ACM <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </motion.main>
  );
}
