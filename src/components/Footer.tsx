import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-bordersubtle bg-surface/40">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-semibold">
              <img src="/logo/acm-logo.png" alt="ACM logo" className="h-20 w-20 object-contain" />
              ACM · PES MCOE
            </div>
            <p className="mt-4 max-w-sm text-sm text-ink-muted">
              The official student chapter of the Association for Computing
              Machinery at PES Modern College of Engineering, Pune. Building a
              community of builders, one commit at a time.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="#" aria-label="GitHub" className="text-ink-muted transition-colors hover:text-accent-secondary"><Github size={18} /></a>
              <a href="#" aria-label="LinkedIn" className="text-ink-muted transition-colors hover:text-accent-secondary"><Linkedin size={18} /></a>
              <a href="#" aria-label="Instagram" className="text-ink-muted transition-colors hover:text-accent-secondary"><Instagram size={18} /></a>
            </div>
          </div>

          <div>
            <p className="eyebrow text-xs text-accent-secondary">// navigate</p>
            <ul className="mt-4 space-y-2 text-sm text-ink-muted">
              <li><Link to="/about" className="hover:text-ink-primary">About</Link></li>
              <li><Link to="/events" className="hover:text-ink-primary">Events</Link></li>
              <li><Link to="/team" className="hover:text-ink-primary">Team</Link></li>
              <li><Link to="/contact" className="hover:text-ink-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-xs text-accent-secondary">// reach us</p>
            <ul className="mt-4 space-y-3 text-sm text-ink-muted">
              <li className="flex items-center gap-2"><Mail size={14} /> acm@pesmcoe.edu.in</li>
              <li className="flex items-start gap-2"><MapPin size={14} className="mt-0.5" /> PES Modern College of Engineering, Pune</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-bordersubtle pt-6 text-xs text-ink-faint md:flex-row">
          <p>© {new Date().getFullYear()} ACM Student Chapter, PES MCOE. All rights reserved.</p>
          <p className="font-mono">built by students, for students</p>
        </div>
      </div>
    </footer>
  );
}
