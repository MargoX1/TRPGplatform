// src/types/User.ts
export interface User {
  id: number;
  name: string;
  role: 'GM' | 'Player';
  createdAt: string;
}