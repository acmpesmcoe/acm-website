import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, CalendarDays } from "lucide-react";
import client from "../api/client";
import Modal from "../components/Modal";
import ResourceForm, { type FieldConfig } from "../components/ResourceForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

interface EventItem {
  _id: string;
  title: string;
  date: string;
  tag: string;
  description: string;
  image?: string;
  registrationLink?: string;
}

const fields: FieldConfig[] = [
  { name: "title", label: "Title", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "tag", label: "Tag (e.g. Hackathon, Workshop, Talk)", required: true },
  { name: "description", label: "Description", type: "textarea", required: true },
  { name: "image", label: "Image URL", type: "url" },
  { name: "registrationLink", label: "Registration link", type: "url" },
];

export default function Events() {
  const { showToast } = useToast();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await client.get("/events/admin/all");
      setEvents(res.data);
    } catch {
      showToast("Failed to load events", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (editing) {
        await client.put(`/events/${editing._id}`, values);
        showToast("Event updated");
      } else {
        await client.post("/events", values);
        showToast("Event created");
      }
      setModalOpen(false);
      setEditing(null);
      load();
    } catch (err: any) {
      showToast(err.response?.data?.error || "Something went wrong", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await client.delete(`/events/${deleteTarget._id}`);
      showToast("Event deleted");
      setDeleteTarget(null);
      load();
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow text-xs text-accent-secondary">// events</p>
          <h1 className="mt-2 font-display text-2xl font-semibold">Manage events</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 rounded-full bg-grad-signal px-5 py-2.5 text-sm font-medium text-void"
        >
          <Plus size={16} /> New event
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-bordersubtle bg-surface">
        {loading ? (
          <p className="p-6 text-sm text-ink-muted">Loading...</p>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-ink-muted">
            <CalendarDays size={28} />
            <p className="text-sm">No events yet. Add your first one.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-bordersubtle text-ink-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Tag</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {events.map((e) => (
                <tr key={e._id} className="border-b border-bordersubtle last:border-0">
                  <td className="px-5 py-4 font-medium text-ink-primary">{e.title}</td>
                  <td className="px-5 py-4 text-ink-muted">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-secondary">
                      {e.tag}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => { setEditing(e); setModalOpen(true); }}
                      className="mr-3 text-ink-muted hover:text-accent-secondary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(e)}
                      className="text-ink-muted hover:text-accent-danger"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal
        open={modalOpen}
        title={editing ? "Edit event" : "New event"}
        onClose={() => { setModalOpen(false); setEditing(null); }}
      >
        <ResourceForm
          fields={fields}
          initialValues={
            editing
              ? { ...editing, date: editing.date?.slice(0, 10) }
              : { title: "", date: "", tag: "", description: "", image: "", registrationLink: "" }
          }
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          submitLabel={editing ? "Update event" : "Create event"}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this event?"
        message={`"${deleteTarget?.title}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
