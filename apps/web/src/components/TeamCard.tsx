import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

interface Member {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  focus?: string;
  currentPosition?: string;
  batch?: string;
}


export default function TeamCard({ member, index = 0 }: { member: Member; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [imgError, setImgError] = useState(false);

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

  const showFallback = !member.image || imgError;

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
        className="group relative overflow-hidden rounded-2xl glass-panel"
      >
        <div className="relative h-56 overflow-hidden bg-surface2 flex items-center justify-center">
          {showFallback ? (
            <img
              src="/logo/fallback-logo.jpg"
              alt={member.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src={member.image}
              alt={member.name}
              className="h-full w-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent pointer-events-none" />
          <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-ink-primary backdrop-blur hover:text-accent-secondary"
              >
                <Github size={14} />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-ink-primary backdrop-blur hover:text-accent-secondary"
              >
                <Linkedin size={14} />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-void/80 text-ink-primary backdrop-blur hover:text-accent-secondary"
              >
                <Mail size={14} />
              </a>
            )}
          </div>
        </div>
        <div className="p-4" style={{ transform: "translateZ(20px)" }}>
          <h3 className="font-display text-base font-semibold text-ink-primary">{member.name}</h3>
          {member.currentPosition ? (
            <>
              <p className="mt-1 font-mono text-xs text-accent-primary font-medium">{member.currentPosition}</p>
              <p className="mt-2 text-xs text-ink-faint font-mono">{member.role} · {member.batch}</p>
            </>
          ) : (
            <>
              <p className="mt-1 font-mono text-xs text-accent-secondary">{member.role}</p>
              {member.focus && (
                <p className="mt-2 text-xs text-ink-muted line-clamp-1">{member.focus}</p>
              )}
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
