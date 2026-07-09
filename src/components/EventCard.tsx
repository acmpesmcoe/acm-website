import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";

interface EventItem {
  id: number;
  title: string;
  date: string;
  tag: string;
  description: string;
  image: string;
}

export default function EventCard({ event, index = 0 }: { event: EventItem; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-2xl border border-bordersubtle bg-surface"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
        <span className="eyebrow absolute left-4 top-4 rounded-full bg-void/70 px-3 py-1 text-[10px] text-accent-secondary backdrop-blur">
          {event.tag}
        </span>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
          <Calendar size={13} /> {event.date}
        </div>
        <h3 className="mt-2 font-display text-lg font-semibold text-ink-primary">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{event.description}</p>
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-secondary opacity-0 transition-opacity group-hover:opacity-100">
          View details <ArrowUpRight size={15} />
        </div>
      </div>
    </motion.div>
  );
}
