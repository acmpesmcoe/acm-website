import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const isHomeHero = location.pathname === "/" && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300 pointer-events-none">
      <nav
        className={`flex flex-col w-full max-w-6xl rounded-[24px] transition-all duration-300 pointer-events-auto overflow-hidden ${
          scrolled || open 
            ? "bg-surface/85 backdrop-blur-xl border border-bordersubtle shadow-xl shadow-black/40" 
            : "glass-panel"
        } ${isHomeHero ? "force-dark" : ""}`}
      >
        <div className="flex w-full items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-display text-base font-semibold text-ink-primary hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center gap-1.5">
              <img
                src="/logo/pes-logo.png"
                alt="PES MCOE logo"
                className="h-16 w-16 object-contain"
              />
              <img
                src="/logo/acm-logo.png"
                alt="ACM logo"
                className="h-16 w-16 object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm md:text-sm lg:text-base font-semibold leading-tight max-w-[140px] sm:max-w-[180px] md:max-w-none md:whitespace-nowrap">
              PES's MCOE ACM Student Chapter
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:gap-2 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `relative px-3 lg:px-4 py-2 font-mono text-base transition-colors z-10 ${
                    isActive
                      ? "text-ink-primary font-medium"
                      : "text-ink-muted hover:text-ink-primary"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="activeNavPill"
                        className="absolute inset-0 -z-10 rounded-full bg-surface2/60 border border-bordersubtle/40"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}

            <a
              href={import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-3 lg:px-4 py-2 font-mono text-base text-ink-muted hover:text-ink-primary transition-colors z-10"
            >
              Admin
            </a>

            <div className="h-4 w-[1px] bg-bordersubtle mx-1.5" />

            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />

            <button
              onClick={() => setOpen(!open)}
              className="text-ink-primary"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-bordersubtle bg-surface/50 backdrop-blur-md md:hidden"
            >
              <div className="flex flex-col gap-4 px-6 py-6">
                {links.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="font-mono text-base text-ink-muted hover:text-ink-primary"
                  >
                    {link.label}
                  </NavLink>
                ))}

                <a
                  href={import.meta.env.VITE_ADMIN_URL || "http://localhost:5174"}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="font-mono text-base text-ink-muted hover:text-ink-primary"
                >
                  Admin
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}