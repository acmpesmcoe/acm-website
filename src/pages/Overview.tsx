import { useEffect, useState } from "react";
import { CalendarDays, Users, GraduationCap, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function Overview() {
  const [stats, setStats] = useState({ events: 0, team: 0, alumni: 0, messages: 0, unread: 0 });

  useEffect(() => {
    (async () => {
      try {
        const [eventsRes, teamRes, alumniRes, messagesRes] = await Promise.all([
          client.get("/events/admin/all"),
          client.get("/team/admin/all"),
          client.get("/alumni"),
          client.get("/contact"),
        ]);
        setStats({
          events: eventsRes.data.length,
          team: teamRes.data.length,
          alumni: alumniRes.data.length,
          messages: messagesRes.data.length,
          unread: messagesRes.data.filter((m: any) => !m.read).length,
        });
      } catch {
        // silently ignore - individual pages will surface errors
      }
    })();
  }, []);

  const cards = [
    { label: "Events", value: stats.events, icon: CalendarDays, to: "/events" },
    { label: "Team members", value: stats.team, icon: Users, to: "/team" },
    { label: "Alumni", value: stats.alumni, icon: GraduationCap, to: "/alumni" },
    {
      label: "Messages",
      value: stats.messages,
      sublabel: stats.unread > 0 ? `${stats.unread} unread` : undefined,
      icon: Mail,
      to: "/messages",
    },
  ];

  return (
    <div>
      <p className="eyebrow text-xs text-accent-secondary">// overview</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Chapter dashboard</h1>
      <p className="mt-2 text-sm text-ink-muted">
        Everything on the public site funnels through here.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="group rounded-2xl border border-bordersubtle bg-surface p-6 transition-colors hover:border-accent-primary/50"
          >
            <c.icon className="text-accent-secondary" size={22} />
            <p className="mt-4 font-display text-3xl font-semibold">{c.value}</p>
            <p className="mt-1 text-sm text-ink-muted">{c.label}</p>
            {c.sublabel && (
              <p className="mt-1 font-mono text-xs text-accent-warm">{c.sublabel}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
