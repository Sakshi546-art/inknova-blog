import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("inknova_token");
    if (!token) return setLoading(false);

    api.get("/auth/me")
      .then((res) => setUser(res.data.user))
      .catch(() => localStorage.removeItem("inknova_token"))
      .finally(() => setLoading(false));
  }, []);

  const login = async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("inknova_token", res.data.token);
    setUser(res.data.user);
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("inknova_token", res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("inknova_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
