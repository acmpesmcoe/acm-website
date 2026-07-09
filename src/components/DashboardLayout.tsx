import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, CalendarDays, Users, GraduationCap, Mail, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { to: "/", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/team", label: "Team", icon: Users },
  { to: "/alumni", label: "Alumni", icon: GraduationCap },
  { to: "/messages", label: "Messages", icon: Mail },
];

export default function DashboardLayout() {
  const { admin, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-void">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-bordersubtle bg-surface/40 p-5">
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
          <div className="px-2 text-sm">
            <p className="font-medium text-ink-primary">{admin?.name}</p>
            <p className="font-mono text-xs text-ink-muted">{admin?.role}</p>
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
