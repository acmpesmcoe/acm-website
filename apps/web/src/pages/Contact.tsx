import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Github, Linkedin, Instagram, Send, Check } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import client from "../api/client";

const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: { duration: 0.35, ease: "easeOut" },
} as const;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await client.post("/contact", form);
      setSent(true);
    } catch (err: any) {
      const msg =
        err?.response?.data?.error ||
        "Something went wrong sending your message. Please try again.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.main {...pageTransition} className="pt-32">
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <ScrollReveal>
          <p className="eyebrow text-xs text-accent-secondary">// contact</p>
          <h1 className="mt-4 font-display text-4xl font-semibold md:text-5xl">
            Say <span className="text-gradient">hello@acm.</span>
          </h1>
          <p className="mt-6 max-w-xl text-ink-muted">
            Questions about joining, sponsoring, or collaborating? Send us a
            message — a core team member replies within a couple of days.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-bordersubtle bg-surface p-8"
            >
              <div className="grid gap-5">
                <label className="block">
                  <span className="font-mono text-xs text-ink-muted">Name</span>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm text-ink-primary outline-none transition-colors focus:border-accent-secondary"
                    placeholder="Your full name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-xs text-ink-muted">Email</span>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm text-ink-primary outline-none transition-colors focus:border-accent-secondary"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="block">
                  <span className="font-mono text-xs text-ink-muted">Message</span>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm text-ink-primary outline-none transition-colors focus:border-accent-secondary"
                    placeholder="Tell us what's on your mind"
                  />
                </label>
                {error && (
                  <p className="text-sm text-red-400">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sent || submitting}
                  className="flex items-center justify-center gap-2 rounded-full bg-grad-signal px-6 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.02] disabled:opacity-70"
                >
                  {sent ? (
                    <>
                      <Check size={16} /> Message sent
                    </>
                  ) : submitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={16} /> Send message
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-2xl border border-bordersubtle bg-surface p-6">
                <p className="eyebrow text-xs text-accent-secondary">// email</p>
                <a href="mailto:acm@pesmcoe.edu.in" className="mt-3 flex items-center gap-3 text-sm hover:text-accent-secondary">
                  <Mail size={16} /> acm@pesmcoe.edu.in
                </a>
                <p className="mt-2 text-xs text-ink-faint">
                  Replies within a couple of days.
                </p>
              </div>
              <div className="rounded-2xl border border-bordersubtle bg-surface p-6">
                <p className="eyebrow text-xs text-accent-secondary">// location</p>
                <p className="mt-3 flex items-start gap-3 text-sm text-ink-muted">
                  <MapPin size={16} className="mt-0.5" />
                  PES Modern College of Engineering, Pune, Maharashtra
                </p>
              </div>
              <div className="rounded-2xl border border-bordersubtle bg-surface p-6">
                <p className="eyebrow text-xs text-accent-secondary">// social</p>
                <div className="mt-4 flex gap-4">
                  <a
                    href="https://github.com/acmpesmcoe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-accent-secondary"
                  >
                    <Github size={18} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/acm-student-chapter-423992307"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-accent-secondary"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href="https://www.instagram.com/pesmcoe_acm/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-muted hover:text-accent-secondary"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.main>
  );
}
