import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, GraduationCap } from "lucide-react";
import client from "../api/client";
import Modal from "../components/Modal";
import ResourceForm, { type FieldConfig } from "../components/ResourceForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

interface AlumniItem {
  _id: string;
  name: string;
  batch: string;
  role: string;
  currentPosition?: string;
  image?: string;
  linkedin?: string;
}

const fields: FieldConfig[] = [
  { name: "name", label: "Name", required: true },
  { name: "batch", label: "Batch / graduation year", required: true, placeholder: "2023" },
  { name: "role", label: "Role held in chapter", required: true, placeholder: "Ex-Chairperson" },
  { name: "currentPosition", label: "Current position", placeholder: "SDE @ Company" },
  { name: "image", label: "Image URL", type: "url" },
  { name: "linkedin", label: "LinkedIn URL", type: "url" },
];

export default function Alumni() {
  const { showToast } = useToast();
  const [alumni, setAlumni] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AlumniItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AlumniItem | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await client.get("/alumni");
      setAlumni(res.data);
    } catch {
      showToast("Failed to load alumni", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (editing) {
        await client.put(`/alumni/${editing._id}`, values);
        showToast("Alumni record updated");
      } else {
        await client.post("/alumni", values);
        showToast("Alumni added");
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
      await client.delete(`/alumni/${deleteTarget._id}`);
      showToast("Alumni removed");
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
          <p className="eyebrow text-xs text-accent-secondary">// alumni</p>
          <h1 className="mt-2 font-display text-2xl font-semibold">Manage alumni</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 rounded-full bg-grad-signal px-5 py-2.5 text-sm font-medium text-void"
        >
          <Plus size={16} /> New alumnus
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-bordersubtle bg-surface">
        {loading ? (
          <p className="p-6 text-sm text-ink-muted">Loading...</p>
        ) : alumni.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-ink-muted">
            <GraduationCap size={28} />
            <p className="text-sm">No alumni records yet. Add your first one.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-bordersubtle text-ink-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Batch</th>
                <th className="px-5 py-3 font-medium">Current position</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {alumni.map((a) => (
                <tr key={a._id} className="border-b border-bordersubtle last:border-0">
                  <td className="px-5 py-4 font-medium text-ink-primary">{a.name}</td>
                  <td className="px-5 py-4 text-ink-muted">{a.batch}</td>
                  <td className="px-5 py-4 text-ink-muted">{a.currentPosition || "—"}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => { setEditing(a); setModalOpen(true); }}
                      className="mr-3 text-ink-muted hover:text-accent-secondary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(a)}
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
        title={editing ? "Edit alumnus" : "New alumnus"}
        onClose={() => { setModalOpen(false); setEditing(null); }}
      >
        <ResourceForm
          fields={fields}
          initialValues={
            editing || { name: "", batch: "", role: "", currentPosition: "", image: "", linkedin: "" }
          }
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          submitLabel={editing ? "Update record" : "Add alumnus"}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Remove this alumnus?"
        message={`"${deleteTarget?.name}" will be permanently removed.`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
