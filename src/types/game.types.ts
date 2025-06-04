export interface User {
  id: number;
  username: string;
}

export interface Game {
  id: number;
  title: string;
  gmId: number; // Заменили creatorId
  playerIds: number[]; // Только ID игроков
  createdAt: string;
}

export interface Player {
  userId: number;
  gameId: number;
  characterName: string; // Просто имя персонажа
}

export interface Message {
  id: number;
  gameId: number;
  userId: number;
  text: string; // Только текст, без команд
  createdAt: string;
}
