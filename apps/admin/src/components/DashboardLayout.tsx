import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, GraduationCap, Mail, LogOut, Sun, Moon, Image as ImageIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/team", label: "Team", icon: Users },
  { to: "/alumni", label: "Alumni", icon: GraduationCap },
  { to: "/messages", label: "Messages", icon: Mail },
  { to: "/gallery", label: "Gallery", icon: ImageIcon },
];

export default function DashboardLayout() {
  const { admin, logout } = useAuth();

  const [theme, setTheme] = useState<"dark" | "light">(() => {
    const stored = localStorage.getItem("acm-admin-theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
    localStorage.setItem("acm-admin-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <div className="flex min-h-screen bg-void transition-colors duration-300">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-bordersubtle bg-surface2/60 dark:bg-surface/40 p-5 transition-colors duration-300">
        <div className="flex items-center gap-2 px-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-grad-signal font-mono text-sm text-void">
            {"{}"}
          </span>
          ACM Admin
        </div>

        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-accent-primary/15 text-accent-secondary"
                    : "text-ink-muted hover:bg-surface2 hover:text-ink-primary"
                }`
              }
            >
              <item.icon size={17} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-bordersubtle pt-4">
          <div className="flex items-center justify-between px-2 text-sm">
            <div>
              <p className="font-medium text-ink-primary">{admin?.name}</p>
              <p className="font-mono text-xs text-ink-muted">{admin?.role}</p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg text-ink-muted hover:bg-surface2 hover:text-ink-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
          <button
            onClick={logout}
            className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-surface2 hover:text-accent-danger"
          >
            <LogOut size={16} /> Log out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
