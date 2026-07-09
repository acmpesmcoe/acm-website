import { motion } from "framer-motion";
import ScrollReveal from "../components/ScrollReveal";
import TeamCard from "../components/TeamCard";
import { useEffect, useState } from "react";
import client from "../api/client";

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4 },
};

export default function Team() {
  const [facultyMentors, setFacultyMentors] = useState<any[]>([]);
  const [coreTeam, setCoreTeam] = useState<any[]>([]);

  useEffect(() => {
    client.get("/team").then((res) => {
      setFacultyMentors(res.data.faculty);
      setCoreTeam(res.data.core);
    }).catch(() => {});
  }, []);

  return (
    <motion.main {...pageTransition} className="pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// team</p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            The people <span className="text-gradient">behind the chapter.</span>
          </h1>
          <p className="mt-6 max-w-xl text-ink-muted">
            Faculty mentors keep us grounded. The core team keeps things
            running. Hover a card — it's not just a photo.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// faculty_mentors</p>
          <h2 className="mt-4 font-display text-2xl font-semibold">Faculty mentors</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {facultyMentors.map((f, i) => (
            <TeamCard key={f._id} member={f} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 pb-28">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// core_members</p>
          <h2 className="mt-4 font-display text-2xl font-semibold">Core team</h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {coreTeam.map((m, i) => (
            <TeamCard key={m._id} member={m} index={i} />
          ))}
        </div>
      </section>
    </motion.main>
  );
}
