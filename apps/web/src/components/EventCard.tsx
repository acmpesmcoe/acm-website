import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowUpRight } from "lucide-react";
import Modal from "./Modal";
import { getCategoryStyles } from "../data/eventColors";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  image: string;
  registrationLink?: string;
}

export default function EventCard({ event, index = 0, isUpcoming = false, isFeatured = false }: { event: EventItem; index?: number; isUpcoming?: boolean; isFeatured?: boolean }) {
  const [modalOpen, setModalOpen] = useState(false);
  const styles = getCategoryStyles(event.tag);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        whileHover={{ y: -6 }}
        onClick={() => setModalOpen(true)}
        className={`group relative overflow-hidden rounded-2xl border bg-surface cursor-pointer select-none transition-all duration-300 ${
          isFeatured 
            ? "border-accent-primary/60 dark:border-accent-primary/45 shadow-[0_0_18px_rgba(66,133,244,0.15)] shadow-black/10" 
            : "border-bordersubtle shadow-sm"
        }`}
      >
        <div className="relative h-44 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <span className={`eyebrow absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] border font-semibold ${styles.bg} ${styles.text} ${styles.border} backdrop-blur-md`}>
            {event.tag}
          </span>
          {isFeatured && (
            <span className="eyebrow absolute right-4 top-4 rounded-full bg-accent-primary/95 text-void px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm">
              Next Up
            </span>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 font-mono text-xs text-ink-muted">
            <Calendar size={13} /> {event.date}
          </div>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink-primary">
            {event.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-1">{event.description}</p>
          <div className="mt-4 flex items-center gap-1 text-sm font-medium text-accent-secondary opacity-0 transition-opacity group-hover:opacity-100">
            Read more <ArrowUpRight size={15} />
          </div>
        </div>
      </motion.div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={event.title}>
        <div className="overflow-hidden rounded-2xl border border-bordersubtle mb-6">
          <img src={event.image} alt={event.title} className="h-64 w-full object-cover" />
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-muted mb-5">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} /> {event.date}
          </div>
          <span className={`rounded-full px-2.5 py-0.5 border ${styles.bg} ${styles.text} ${styles.border}`}>
            {event.tag}
          </span>
        </div>

        <p className="text-sm leading-relaxed text-ink-muted whitespace-pre-line mb-8">{event.description}</p>

        <div className="border-t border-bordersubtle/30 pt-6 flex justify-end gap-3">
          <button
            onClick={() => setModalOpen(false)}
            className="rounded-full border border-bordersubtle px-5 py-2 text-xs font-medium text-ink-primary hover:bg-surface2 transition-colors"
          >
            Close
          </button>
          {isUpcoming && (
            <a
              href={event.registrationLink || "/contact"}
              target={event.registrationLink ? "_blank" : undefined}
              rel={event.registrationLink ? "noopener noreferrer" : undefined}
              className="rounded-full bg-grad-signal px-6 py-2 text-xs font-medium text-void transition-transform hover:scale-105"
            >
              {event.registrationLink ? "Register now" : "Get notified"}
            </a>
          )}
        </div>
      </Modal>
    </>
  );
}

