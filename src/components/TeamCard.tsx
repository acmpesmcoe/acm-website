import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin } from "lucide-react";

interface Member {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
}

export default function TeamCard({ member, index = 0 }: { member: Member; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 20 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }}
        className="group relative overflow-hidden rounded-2xl border border-bordersubtle bg-surface"
      >
        <div className="relative h-56 overflow-hidden">
          <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/10 to-transparent" />
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {member.github && (
              <a href={member.github} className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-ink-primary backdrop-blur hover:text-accent-secondary">
                <Github size={14} />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-ink-primary backdrop-blur hover:text-accent-secondary">
                <Linkedin size={14} />
              </a>
            )}
          </div>
        </div>
        <div className="p-4" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-display text-base font-semibold text-ink-primary">{member.name}</h3>
          <p className="mt-1 font-mono text-xs text-accent-secondary">{member.role}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
