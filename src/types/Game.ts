// types/Game.ts
import { Player } from "../types/Player";

export interface Game {
  id: number;
  title: string;
  creatorId: number; // ID создателя (изначальный GM)
  players: Player[]; // Все участники игры
  createdAt: string;
  //  isPublic: boolean; // Флаг публичности игры
}
