// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { mockLogin, mockRegister, mockGetUserById } from "../api/mockAuth";

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const user = mockGetUserById(Number(userId));
      if (user) setUser(user);
    }
  }, []);

  const login = async (username: string, password: string) => {
    // Здесь будет реальный API-запрос
    const authUser = mockLogin(username, password);
    setUser(authUser);
    localStorage.setItem("userId", authUser.id.toString());
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    // Здесь будет реальный API-запрос
    const newUser = mockRegister(username, email, password);
    setUser(newUser);
    localStorage.setItem("userId", newUser.id.toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
