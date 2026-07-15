import { useState, type FormEvent } from "react";

export interface FieldConfig {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "select" | "url";
  options?: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export default function ResourceForm({
  fields,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = "Save",
}: {
  fields: FieldConfig[];
  initialValues: Record<string, any>;
  onSubmit: (values: Record<string, any>) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}) {
  const [values, setValues] = useState<Record<string, any>>(initialValues);
  const [saving, setSaving] = useState(false);

  const handleChange = (name: string, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSubmit(values);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <label key={field.name} className="block">
          <span className="font-mono text-xs text-ink-muted">{field.label}</span>

          {field.type === "textarea" ? (
            <textarea
              required={field.required}
              rows={4}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm outline-none focus:border-accent-secondary"
            />
          ) : field.type === "select" ? (
            <select
              required={field.required}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm outline-none focus:border-accent-secondary"
            >
              <option value="" disabled>Select...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          ) : (
            <input
              required={field.required}
              type={field.type === "date" ? "date" : field.type === "url" ? "url" : "text"}
              value={values[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm outline-none focus:border-accent-secondary"
            />
          )}
        </label>
      ))}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-bordersubtle px-4 py-2 text-sm text-ink-muted hover:text-ink-primary"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-grad-signal px-5 py-2 text-sm font-medium text-void disabled:opacity-60"
        >
          {saving ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
