import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/team", label: "Team" },
  { to: "/alumni", label: "Alumni" },
  { to: "/contact", label: "Contact" },
];

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || "http://localhost:5173";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-void/80 backdrop-blur-md border-b border-bordersubtle"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
        >
          <img
            src="/logo/acm-logo.png"
            alt="ACM logo"
            className="h-24 w-24 object-contain"
          />
          <span>
            ACM <span className="text-ink-muted">· PES MCOE</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-mono text-sm transition-colors ${
                  isActive
                    ? "text-accent-secondary"
                    : "text-ink-muted hover:text-ink-primary"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Admin Link */}
          <a
            href={ADMIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-ink-muted hover:text-ink-primary"
          >
            Admin
          </a>

          <ThemeToggle />

          <Link
            to="/contact"
            className="rounded-full bg-grad-signal px-5 py-2 text-sm font-medium text-void transition-transform hover:scale-105"
          >
            Join ACM
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />

          <button
            onClick={() => setOpen(!open)}
            className="text-ink-primary"
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-bordersubtle bg-void md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm text-ink-muted hover:text-ink-primary"
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Admin Link */}
              <a
                href={ADMIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-ink-muted hover:text-ink-primary"
              >
                Admin
              </a>

              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="w-fit rounded-full bg-grad-signal px-5 py-2 text-sm font-medium text-void"
              >
                Join ACM
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}