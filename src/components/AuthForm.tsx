// src/components/AuthForm.tsx
import React, { useState } from "react";

interface AuthFormProps {
  isLoginMode: boolean;
  onSubmit: (username: string, email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLoginMode, onSubmit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, isLoginMode ? "" : email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-400 mb-2">Имя пользователя</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
          required
        />
      </div>

      {!isLoginMode && (
        <div>
          <label className="block text-gray-400 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-gray-400 mb-2">Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 bg-gray-700 text-white rounded-lg"
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition"
      >
        {isLoginMode ? "Войти" : "Зарегистрироваться"}
      </button>
    </form>
  );
};

export default AuthForm;
