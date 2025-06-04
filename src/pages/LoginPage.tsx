// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [error, setError] = useState("");

  const handleAuthSubmit = async (
    username: string,
    email: string,
    password: string
  ) => {
    setError("");
    try {
      if (isLoginMode) {
        await login(username, password);
      } else {
        await register(username, email, password);
      }
      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message || "Произошла ошибка при авторизации");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          ТРИ Платформа
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <AuthForm isLoginMode={isLoginMode} onSubmit={handleAuthSubmit} />

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLoginMode(!isLoginMode)}
            className="text-purple-400 hover:text-purple-300"
          >
            {isLoginMode
              ? "Нет аккаунта? Зарегистрироваться"
              : "Уже есть аккаунт? Войти"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
