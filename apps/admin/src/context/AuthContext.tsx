import { createContext, useContext, useState, type ReactNode } from "react";
import client from "../api/client";

interface AdminInfo {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  admin: AdminInfo | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<AdminInfo | null>(() => {
    const stored = localStorage.getItem("acm-admin-info");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string) => {
    const res = await client.post("/auth/login", { email, password });
    const { token, admin: adminInfo } = res.data;
    localStorage.setItem("acm-admin-token", token);
    localStorage.setItem("acm-admin-info", JSON.stringify(adminInfo));
    setAdmin(adminInfo);
  };

  const logout = () => {
    localStorage.removeItem("acm-admin-token");
    localStorage.removeItem("acm-admin-info");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
