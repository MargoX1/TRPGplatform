// types/Player.ts
export interface Player {
  userId: number;
  gameId: number;
  role: "GM" | "PLAYER"; // Роль в конкретной игре
  character?: Character; // Опционально: данные персонажа
  joinedAt: string;
}

// Тип персонажа
export interface Character {
  id: number;
  name: string;
  description?: string;
  createdAt: string;
}
