import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import { facultyMentors } from "../data/content";
import { Target, Eye } from "lucide-react";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

export default function About() {
  return (
    <motion.main {...pageTransition} className="pt-32">
      <section className="mx-auto max-w-4xl px-6">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// about_acm</p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            One global society. <span className="text-gradient">One local chapter.</span>
          </h1>
          <p className="mt-6 text-ink-muted">
            The Association for Computing Machinery (ACM) is the world's
            largest educational and scientific computing society, connecting
            computing educators, researchers, and professionals to inspire
            dialogue, share resources, and address the field's challenges.
            Founded in 1947, it remains the oldest and largest such society
            in the world.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// pes_mcoe_chapter</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">About the PES MCOE chapter</h2>
          <p className="mt-6 text-ink-muted">
            Our chapter brings ACM's global mission to PES Modern College of
            Engineering, Pune. We run hands-on workshops, technical talks,
            hackathons, and peer-mentoring programs that help students go
            from writing their first "Hello, World" to shipping production
            software. The chapter is entirely student-run, with faculty
            guidance ensuring every initiative stays true to ACM's academic
            standards.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal>
            <div className="h-full rounded-2xl border border-bordersubtle bg-surface p-8">
              <Target className="text-accent-secondary" size={24} />
              <h3 className="mt-4 font-display text-xl font-semibold">Mission</h3>
              <p className="mt-3 text-sm text-ink-muted">
                To cultivate a community at PES MCOE where students learn
                computing by building, mentor each other without ego, and
                carry that spirit into their careers.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="h-full rounded-2xl border border-bordersubtle bg-surface p-8">
              <Eye className="text-accent-secondary" size={24} />
              <h3 className="mt-4 font-display text-xl font-semibold">Vision</h3>
              <p className="mt-3 text-sm text-ink-muted">
                To be the most active and respected technical student body
                on campus — a chapter that alumni still point to as where
                their engineering identity was formed.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 pb-28">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// faculty_coordinator</p>
          <h2 className="mt-4 font-display text-3xl font-semibold">Guided by</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {facultyMentors.map((f, i) => (
            <ScrollReveal key={f.name} delay={i * 0.1}>
              <div className="flex items-center gap-4 rounded-2xl border border-bordersubtle bg-surface p-5">
                <img src={f.image} alt={f.name} className="h-16 w-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-display font-semibold">{f.name}</h3>
                  <p className="font-mono text-xs text-accent-secondary">{f.role}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </motion.main>
  );
}
