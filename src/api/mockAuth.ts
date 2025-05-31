// src/api/mockAuth.ts
import { User } from '../types/User';

export const mockLogin = (role: 'GM' | 'Player'): User => {
  // Генерация случайного ID
  const userId = Math.floor(Math.random() * 1000);
  
  return {
    id: userId,
    name: role === 'GM' ? 'Мастер Игры' : `Игрок#${userId}`,
    role,
    createdAt: new Date().toISOString()
  };
};