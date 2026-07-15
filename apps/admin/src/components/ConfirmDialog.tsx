import { AlertTriangle } from "lucide-react";

export default function ConfirmDialog({
  open,
  title,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-bordersubtle bg-surface p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-danger/10">
            <AlertTriangle size={20} className="text-accent-danger" />
          </div>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
        </div>
        <p className="mt-3 text-sm text-ink-muted">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-bordersubtle px-4 py-2 text-sm text-ink-muted hover:text-ink-primary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-accent-danger px-4 py-2 text-sm font-medium text-white hover:bg-accent-danger/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
