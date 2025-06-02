// src/api/mockAuth.ts
import { User } from "../types/User";

// Ключ для хранения в localStorage
const STORAGE_KEY = "mockUsers";

// Загрузка пользователей из localStorage
const loadUsers = (): User[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Сохранение пользователей в localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Инициализация начальных пользователей
const initMockUsers = () => {
  const users = loadUsers();
  if (users.length === 0) {
    const initialUsers: User[] = [
      {
        id: 1,
        username: "game_master",
        email: "gm@example.com",
        password: "1234567890",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        username: "player_one",
        email: "player1@example.com",
        password: "1234567890",
        createdAt: new Date().toISOString(),
      },
    ];
    saveUsers(initialUsers);
  }
};

// Инициализируем при первом импорте
initMockUsers();

export const mockLogin = (username: string, password: string): User => {
  const users = loadUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) throw new Error("Неверные учетные данные");

  return user;
};

export const mockRegister = (
  username: string,
  email: string,
  password: string
): User => {
  const users = loadUsers();

  // Проверка существующего пользователя
  if (users.some((u) => u.username === username || u.email === email)) {
    throw new Error("Пользователь с таким именем или email уже существует");
  }

  const newUser: User = {
    id: Math.max(0, ...users.map((u) => u.id)) + 1,
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  return newUser;
};

export const mockGetUserById = (id: number): User | undefined => {
  const users = loadUsers();
  return users.find((u) => u.id === id);
};
