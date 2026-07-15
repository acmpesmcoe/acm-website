import { useEffect, useState } from "react";
import { CalendarDays, Users, GraduationCap, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function Overview() {
  const [stats, setStats] = useState({ events: 0, team: 0, alumni: 0, messages: 0, unread: 0 });

  useEffect(() => {
    (async () => {
      const [eventsRes, teamRes, alumniRes, messagesRes] = await Promise.allSettled([
        client.get("/events/admin/all"),
        client.get("/team/admin/all"),
        client.get("/alumni"),
        client.get("/contact"),
      ]);

      setStats((prev) => ({
        events: eventsRes.status === "fulfilled" ? eventsRes.value.data.length : prev.events,
        team: teamRes.status === "fulfilled" ? teamRes.value.data.length : prev.team,
        alumni: alumniRes.status === "fulfilled" ? alumniRes.value.data.length : prev.alumni,
        messages: messagesRes.status === "fulfilled" ? messagesRes.value.data.length : prev.messages,
        unread:
          messagesRes.status === "fulfilled"
            ? messagesRes.value.data.filter((m: any) => !m.read).length
            : prev.unread,
      }));

      // Optional: surface which calls failed, e.g. for debugging or a toast
      [eventsRes, teamRes, alumniRes, messagesRes].forEach((r, i) => {
        if (r.status === "rejected") {
          const labels = ["events", "team", "alumni", "messages"];
          console.error(`Failed to load ${labels[i]} stats:`, r.reason);
        }
      });
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
