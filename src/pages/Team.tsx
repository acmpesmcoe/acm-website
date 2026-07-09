import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import client from "../api/client";
import Modal from "../components/Modal";
import ResourceForm, { type FieldConfig } from "../components/ResourceForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

interface Member {
  _id: string;
  name: string;
  role: string;
  category: "faculty" | "core";
  image?: string;
  github?: string;
  linkedin?: string;
  order?: number;
}

const fields: FieldConfig[] = [
  { name: "name", label: "Name", required: true },
  { name: "role", label: "Role (e.g. Chairperson, Faculty Mentor)", required: true },
  {
    name: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { value: "core", label: "Core member" },
      { value: "faculty", label: "Faculty mentor" },
    ],
  },
  { name: "image", label: "Image URL", type: "url" },
  { name: "github", label: "GitHub URL", type: "url" },
  { name: "linkedin", label: "LinkedIn URL", type: "url" },
  { name: "order", label: "Display order (lower shows first)" },
];

export default function Team() {
  const { showToast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await client.get("/team/admin/all");
      setMembers(res.data);
    } catch {
      showToast("Failed to load team members", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const payload = { ...values, order: Number(values.order) || 0 };
      if (editing) {
        await client.put(`/team/${editing._id}`, payload);
        showToast("Team member updated");
      } else {
        await client.post("/team", payload);
        showToast("Team member added");
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
      await client.delete(`/team/${deleteTarget._id}`);
      showToast("Team member removed");
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
          <p className="eyebrow text-xs text-accent-secondary">// team</p>
          <h1 className="mt-2 font-display text-2xl font-semibold">Manage team</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 rounded-full bg-grad-signal px-5 py-2.5 text-sm font-medium text-void"
        >
          <Plus size={16} /> New member
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-bordersubtle bg-surface">
        {loading ? (
          <p className="p-6 text-sm text-ink-muted">Loading...</p>
        ) : members.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-ink-muted">
            <Users size={28} />
            <p className="text-sm">No team members yet. Add your first one.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-bordersubtle text-ink-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Role</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id} className="border-b border-bordersubtle last:border-0">
                  <td className="px-5 py-4 font-medium text-ink-primary">{m.name}</td>
                  <td className="px-5 py-4 text-ink-muted">{m.role}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-accent-primary/10 px-3 py-1 font-mono text-xs text-accent-secondary">
                      {m.category}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => { setEditing(m); setModalOpen(true); }}
                      className="mr-3 text-ink-muted hover:text-accent-secondary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(m)}
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
        title={editing ? "Edit team member" : "New team member"}
        onClose={() => { setModalOpen(false); setEditing(null); }}
      >
        <ResourceForm
          fields={fields}
          initialValues={
            editing || { name: "", role: "", category: "core", image: "", github: "", linkedin: "", order: 0 }
          }
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          submitLabel={editing ? "Update member" : "Add member"}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove this member?"
        message={`"${deleteTarget?.name}" will be permanently removed from the team page.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
