// src/api/mockGame.ts
import { Game } from "../types/Game";
import { Player } from "../types/Player";

// Ключ для хранения игр в localStorage
const STORAGE_KEY = "mockGames";

// Загрузка игр из localStorage
const loadGames = (): Game[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Сохранение игр в localStorage
const saveGames = (games: Game[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
};

// Инициализация начальных игр
const initMockGames = () => {
  const games = loadGames();
  if (games.length === 0) {
    // Создаем тестовую игру при первом запуске
    const initialGame: Game = {
      id: 1,
      title: "Подземелье Дракона",
      creatorId: 1,
      players: [
        {
          userId: 1,
          gameId: 1,
          role: "GM",
          // character: {
          //   id: 1,
          //   name: "Мастер Игры",
          //   description: "Создатель этого мира",
          //   createdAt: new Date().toISOString(),
          // },
          joinedAt: new Date().toISOString(),
        },
      ],
      createdAt: new Date().toISOString(),
      //isPublic: true,
    };
    saveGames([initialGame]);
  }
};

// Инициализируем при первом импорте
initMockGames();

export const mockCreateGame = (title: string, creatorId: number): Game => {
  const games = loadGames();

  const newGame: Game = {
    id: Math.max(0, ...games.map((g) => g.id)) + 1,
    title,
    creatorId,
    players: [
      {
        userId: creatorId,
        gameId: Math.max(0, ...games.map((g) => g.id)) + 1,
        role: "GM",
        // character: {
        //   id: 1,
        //   name: "Мастер Игры",
        //   description: "Создатель этой игры",
        //   createdAt: new Date().toISOString()
        // },
        joinedAt: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    // isPublic: true
  };

  const updatedGames = [...games, newGame];
  saveGames(updatedGames);

  return newGame;
};

export const mockJoinGame = (
  gameId: number,
  userId: number
  // characterName: string
): Game => {
  const games = loadGames();
  const game = games.find((g) => g.id === gameId);

  if (!game) throw new Error("Игра не найдена");

  // Проверяем, не присоединен ли уже пользователь
  const isAlreadyJoined = game.players.some((p) => p.userId === userId);

  if (!isAlreadyJoined) {
    const newPlayer: Player = {
      userId,
      gameId,
      role: "PLAYER",
      // character: {
      //   id: game.players.length + 1,
      //   name: characterName,
      //   createdAt: new Date().toISOString()
      // },
      joinedAt: new Date().toISOString(),
    };

    const updatedGame = {
      ...game,
      players: [...game.players, newPlayer],
    };

    const updatedGames = games.map((g) => (g.id === gameId ? updatedGame : g));
    saveGames(updatedGames);

    return updatedGame;
  }

  return game;
};

export const mockGetGame = (gameId: number): Game | undefined => {
  const games = loadGames();
  return games.find((g) => g.id === gameId);
};

export const mockGetPublicGames = (): Game[] => {
  const games = loadGames();
  return games /*.filter(game => game.isPublic)*/;
};

export const mockUpdateGame = (updatedGame: Game): Game => {
  const games = loadGames();
  const newGames = games.map((game) =>
    game.id === updatedGame.id ? updatedGame : game
  );
  saveGames(newGames);
  return updatedGame;
};

// export const mockPromotePlayer = (
//   gameId: number,
//   playerId: number
// ): Game => {
//   const games = loadGames();
//   const game = games.find(g => g.id === gameId);

//   if (!game) {
//     throw new Error('Игра не найдена');
//   }

//   const updatedPlayers = game.players.map(player =>
//     player.userId === playerId
//       ? { ...player, role: 'GM' }
//       : player
//   );

//   const updatedGame = {
//     ...game,
//     players: updatedPlayers
//   };

//   return mockUpdateGame(updatedGame);
// };

// Получение игр пользователя
export const mockGetUserGames = (userId: number): Game[] => {
  const games = loadGames();
  return games.filter((game) =>
    game.players.some((player) => player.userId === userId)
  );
};
