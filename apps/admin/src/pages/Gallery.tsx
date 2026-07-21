import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Image as ImageIcon } from "lucide-react";
import client from "../api/client";
import Modal from "../components/Modal";
import ResourceForm, { type FieldConfig } from "../components/ResourceForm";
import ConfirmDialog from "../components/ConfirmDialog";
import { useToast } from "../context/ToastContext";

interface GalleryItem {
  _id: string;
  imageUrl: string;
  caption?: string;
  createdAt: string;
}

const fields: FieldConfig[] = [
  { name: "imageUrl", label: "Image URL", type: "url", required: true },
  { name: "caption", label: "Caption (Optional)", required: false },
];

export default function Gallery() {
  const { showToast } = useToast();
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await client.get("/gallery/admin/all");
      setPhotos(res.data);
    } catch {
      showToast("Failed to load gallery photos", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (editing) {
        await client.put(`/gallery/${editing._id}`, values);
        showToast("Photo updated");
      } else {
        await client.post("/gallery", values);
        showToast("Photo added");
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
      await client.delete(`/gallery/${deleteTarget._id}`);
      showToast("Photo deleted");
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
          <p className="eyebrow text-xs text-accent-secondary">// gallery</p>
          <h1 className="mt-2 font-display text-2xl font-semibold">Moments from the chapter</h1>
        </div>
        <button
          onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 rounded-full bg-grad-signal px-5 py-2.5 text-sm font-medium text-void"
        >
          <Plus size={16} /> Add photo
        </button>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-bordersubtle bg-surface">
        {loading ? (
          <p className="p-6 text-sm text-ink-muted">Loading...</p>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center gap-2 p-12 text-center text-ink-muted">
            <ImageIcon size={28} />
            <p className="text-sm">No photos yet. Add your first one.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="border-b border-bordersubtle text-ink-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Image</th>
                <th className="px-5 py-3 font-medium">Caption</th>
                <th className="px-5 py-3 font-medium">Date Added</th>
                <th className="px-5 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {photos.map((p) => (
                <tr key={p._id} className="border-b border-bordersubtle last:border-0">
                  <td className="px-5 py-4">
                    <img src={p.imageUrl} alt={p.caption || "Gallery photo"} className="h-12 w-20 object-cover rounded" />
                  </td>
                  <td className="px-5 py-4 font-medium text-ink-primary">{p.caption || "-"}</td>
                  <td className="px-5 py-4 text-ink-muted">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => { setEditing(p); setModalOpen(true); }}
                      className="mr-3 text-ink-muted hover:text-accent-secondary"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(p)}
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
        title={editing ? "Edit photo" : "Add photo"}
        onClose={() => { setModalOpen(false); setEditing(null); }}
      >
        <ResourceForm
          fields={fields}
          initialValues={
            editing
              ? { ...editing }
              : { imageUrl: "", caption: "" }
          }
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null); }}
          submitLabel={editing ? "Update photo" : "Add photo"}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this photo?"
        message="This photo will be permanently removed from the gallery."
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
