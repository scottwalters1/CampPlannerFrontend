import React, { createContext, useContext, useState } from "react";

import { apiFetch } from "../api/api";

interface AuthContextType {
  user: {
    username: string;
    userID: string;
  } | null;

  login: (
    username: string,
    password: string
  ) => Promise<{ username: string; userID: string } | null>;
  register: (
    username: string,
    password: string
  ) => Promise<{ username: string; userID: string } | null>;
  loading: boolean;

  logout:() => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{ username: string; userID: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  // called upon login
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiFetch("/users/login", {
        method: "POST",
        body: { username, password },
      });

      if (!data) return null;

      // login sets the cookie, now fetch user info
      const me = await apiFetch("/users/me", { method: "GET" });
      const userObj = { username: me.username, userID: me.userID };
      setUser(userObj);

      return userObj;
    } catch (err) {
      console.error("Login failed:", err);
      return null;
    }
    finally{
      setLoading(false);
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const data = await apiFetch("/users/register", {
        method: "POST",
        body: { username, password },
      });

      if (!data) return null;
      return data;
    } catch (err) {
      console.error("Registration failed:", err);
      return null;
    }
  };

  const logout = async () => {
  try {
    await apiFetch("/users/logout", { method: "POST" });

    setUser(null);
  } catch (err: any) {
    console.error("Logout failed:", err.message || err);
  }
};

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
