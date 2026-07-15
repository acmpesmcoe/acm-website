import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ScrollReveal from "../components/ScrollReveal";
import TeamCard from "../components/TeamCard";
import client from "../api/client";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

interface AlumniItem {
  _id: string;
  name: string;
  batch: string;
  role: string;
  currentPosition?: string;
  image?: string;
  linkedin?: string;
}

export default function Alumni() {
  const [alumni, setAlumni] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client
      .get("/alumni")
      .then((res) => setAlumni(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.main {...pageTransition} className="pt-32">
      <section className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// alumni</p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Where our <span className="text-gradient">alumni ended up.</span>
          </h1>
          <p className="mt-6 max-w-xl text-ink-muted">
            Former members of the chapter, now out building things across the
            industry. Still part of the network.
          </p>
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16 pb-28">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading alumni...</p>
        ) : alumni.length === 0 ? (
          <p className="text-sm text-ink-muted">No alumni records yet — check back soon.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {alumni.map((a, i) => (
              <div key={a._id}>
                <TeamCard
                  member={{
                    name: a.name,
                    role: a.role,
                    image: a.image || "",
                    linkedin: a.linkedin,
                    currentPosition: a.currentPosition,
                    batch: a.batch,
                  }}
                  index={i}
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.main>
  );
}