import { createContext, useContext, useMemo, useState } from "react";
import { authApi } from "../services/api";

const AuthContext = createContext(null);

const readStoredAuth = () => {
  try {
    return JSON.parse(localStorage.getItem("auth")) || null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(readStoredAuth);

  const persistAuth = (data) => {
    const nextAuth = { user: data.user, token: data.token };
    localStorage.setItem("auth", JSON.stringify(nextAuth));
    localStorage.setItem("user", JSON.stringify(data.user));
    setAuth(nextAuth);
    return nextAuth;
  };

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    return persistAuth(data);
  };

  const register = async (payload) => {
    const data = await authApi.register(payload);
    return persistAuth(data);
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    setAuth(null);
  };

  const value = useMemo(
    () => ({
      user: auth?.user || null,
      token: auth?.token || "",
      isAuthenticated: Boolean(auth?.token),
      isAdmin: auth?.user?.role === "admin",
      login,
      register,
      logout,
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
