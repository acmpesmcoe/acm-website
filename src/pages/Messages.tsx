import { useEffect, useState } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import client from "../api/client";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

interface MessageItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function Messages() {
  const { showToast } = useToast();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState<MessageItem | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await client.get("/contact");
      setMessages(res.data);
    } catch {
      showToast("Failed to load messages", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (m: MessageItem) => {
    try {
      await client.patch(`/contact/${m._id}/read`);
      setMessages((prev) => prev.map((x) => (x._id === m._id ? { ...x, read: true } : x)));
    } catch {
      showToast("Failed to update", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await client.delete(`/contact/${deleteTarget._id}`);
      showToast("Message deleted");
      setDeleteTarget(null);
      load();
    } catch {
      showToast("Failed to delete", "error");
    }
  };

  return (
    <div>
      <p className="eyebrow text-xs text-accent-secondary">// messages</p>
      <h1 className="mt-2 font-display text-2xl font-semibold">Contact submissions</h1>

      <div className="mt-8 space-y-3">
        {loading ? (
          <p className="text-sm text-ink-muted">Loading...</p>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-bordersubtle bg-surface p-12 text-center text-ink-muted">
            <Mail size={28} />
            <p className="text-sm">No messages yet.</p>
          </div>
        ) : (
          messages.map((m) => (
            <div
              key={m._id}
              className={`rounded-2xl border p-5 ${
                m.read ? "border-bordersubtle bg-surface" : "border-accent-secondary/30 bg-accent-primary/5"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-ink-primary">{m.name}</p>
                  <a href={`mailto:${m.email}`} className="font-mono text-xs text-accent-secondary hover:underline">
                    {m.email}
                  </a>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="whitespace-nowrap font-mono text-xs text-ink-faint">
                    {new Date(m.createdAt).toLocaleDateString()}
                  </span>
                  {!m.read && (
                    <button
                      onClick={() => markRead(m)}
                      title="Mark as read"
                      className="text-ink-muted hover:text-accent-secondary"
                    >
                      <MailOpen size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteTarget(m)}
                    title="Delete"
                    className="text-ink-muted hover:text-accent-danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-sm text-ink-muted">{m.message}</p>
            </div>
          ))
        )}
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this message?"
        message="This message will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
