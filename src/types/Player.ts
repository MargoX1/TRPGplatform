// types/Player.ts
export interface Player {
  userId: number;
  gameId: number;
  role: "GM" | "PLAYER"; // Роль в конкретной игре
  //character?: Character; // Опционально: данные персонажа
  joinedAt: string;
}

/*

// Тип персонажа
export interface Character {
  id: number;
  name: string;
  description?: string;
  traits?: CharacterTrait[];
  createdAt: string;
}

// Характеристики персонажа
export interface CharacterTrait {
  name: string;
  value: string;
}

// Тип для присоединения к игре
export interface JoinGameData {
  gameId: number;
  characterName: string;
  characterDescription?: string;
}

// Тип для изменения роли игрока
export interface ChangeRoleData {
  playerId: number;
  newRole: 'GM' | 'PLAYER';
}

*/
