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

  const getRoleWeight = (role: string): number => {
    const norm = role.toLowerCase().trim();
    if (norm === "chairperson" || norm === "chair") return 1;
    if (norm.includes("vice") && norm.includes("chair")) return 2;
    if (norm.includes("treasurer") || norm.includes("treasurere")) return 3;
    return 4;
  };

  // Group by batch
  const groupsMap: Record<string, AlumniItem[]> = {};
  alumni.forEach((a) => {
    const b = a.batch || "Unknown";
    if (!groupsMap[b]) {
      groupsMap[b] = [];
    }
    groupsMap[b].push(a);
  });

  // Convert to array of groups and sort items within each group
  interface GroupedAlumni {
    batch: string;
    items: AlumniItem[];
  }
  const groupsList: GroupedAlumni[] = Object.keys(groupsMap).map((batch) => {
    const items = [...groupsMap[batch]].sort((a, b) => {
      const wA = getRoleWeight(a.role);
      const wB = getRoleWeight(b.role);
      if (wA !== wB) return wA - wB;
      return a.name.localeCompare(b.name);
    });
    return { batch, items };
  });

  // Sort groups by batch year descending
  groupsList.sort((a, b) => {
    const numA = parseInt(a.batch, 10);
    const numB = parseInt(b.batch, 10);
    if (!isNaN(numA) && !isNaN(numB)) {
      return numB - numA;
    }
    return b.batch.localeCompare(a.batch);
  });

  return (
    <motion.main {...pageTransition} className="pt-48">
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
        ) : groupsList.length === 0 ? (
          <p className="text-sm text-ink-muted">No alumni records yet — check back soon.</p>
        ) : (
          <div className="space-y-16">
            {groupsList.map((group) => (
              <div key={group.batch} className="space-y-6">
                <ScrollReveal>
                  <div className="flex items-center gap-4">
                    <h2 className="font-display text-2xl font-semibold text-ink-primary">
                      {group.batch} Alumni
                    </h2>
                    <div className="h-[1px] flex-1 bg-bordersubtle/40" />
                  </div>
                </ScrollReveal>
                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {group.items.map((a, i) => (
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
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.main>
  );
}