import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Check the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-void px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-grad-signal font-mono text-lg text-void">
            {"{}"}
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">ACM Admin</h1>
          <p className="mt-1 text-sm text-ink-muted">PES MCOE chapter dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-bordersubtle bg-surface p-6">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-accent-danger/30 bg-accent-danger/10 px-3 py-2 text-sm text-accent-danger">
              <AlertCircle size={15} /> {error}
            </div>
          )}
          <label className="block">
            <span className="font-mono text-xs text-ink-muted">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm outline-none focus:border-accent-secondary"
              placeholder="admin@example.com"
            />
          </label>
          <label className="mt-4 block">
            <span className="font-mono text-xs text-ink-muted">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-bordersubtle bg-void px-4 py-3 text-sm outline-none focus:border-accent-secondary"
              placeholder="••••••••"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-grad-signal px-6 py-3 text-sm font-medium text-void transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            <LogIn size={16} /> {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
