// src/context/GameContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Game } from "../types/Game";
import {
  mockCreateGame,
  mockJoinGame,
  mockUpdateGame,
  mockGetGame,
  mockGetUserGames,
  mockGetPublicGames,
} from "../api/mockGame";

interface GameContextType {
  publicGames: Game[];
  userGames: Game[];
  createGame: (title: string) => Promise<Game>;
  joinGame: (gameId: number /*, characterName: string*/) => Promise<Game>;
  refreshGames: () => Promise<void>;
  getGameById: (gameId: number) => Game | undefined;
  updateGame: (updatedGame: Game) => Promise<Game>;
  //promotePlayer: (gameId: number, playerId: number) => Promise<Game>;
}

const GameContext = createContext<GameContextType>({
  publicGames: [],
  userGames: [],
  createGame: async () => ({
    id: 0,
    title: "",
    creatorId: 0,
    players: [],
    createdAt: "",
  }),
  joinGame: async () => ({
    id: 0,
    title: "",
    creatorId: 0,
    players: [],
    createdAt: "",
  }),
  refreshGames: async () => {},
  getGameById: () => undefined,
  updateGame: async () => ({
    id: 0,
    title: "",
    creatorId: 0,
    players: [],
    createdAt: "",
  }),
});

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [publicGames, setPublicGames] = useState<Game[]>([]);
  const [userGames, setUserGames] = useState<Game[]>([]);
  const { user } = useAuth();

  // Функция загрузки игр
  const loadGames = async () => {
    try {
      const publicGamesData = mockGetPublicGames();
      setPublicGames(publicGamesData);

      if (user) {
        const userGamesData = mockGetUserGames(user.id);
        setUserGames(userGamesData);
      } else {
        setUserGames([]);
      }
    } catch (error) {
      console.error("Ошибка загрузки игр:", error);
      // В реальном приложении здесь должна быть обработка ошибок
    }
  };

  // Инициализация при монтировании
  useEffect(() => {
    loadGames();
  }, [user]);

  // Создание новой игры
  const createGame = async (title: string): Promise<Game> => {
    if (!user) throw new Error("Пользователь не авторизован");

    const newGame = mockCreateGame(title, user.id);
    await loadGames();
    return newGame;
  };

  // Присоединение к игре
  const joinGame = async (
    gameId: number /*, characterName: string*/
  ): Promise<Game> => {
    if (!user) throw new Error("Пользователь не авторизован");

    // const game = publicGames.find((g) => g.id === gameId);
    // if (!game) throw new Error("Game not found");
    const updatedGame = mockJoinGame(gameId, user.id /*, characterName*/);
    await loadGames();
    return updatedGame;
  };

  // Обновление игры
  const updateGame = async (updatedGame: Game): Promise<Game> => {
    const game = mockUpdateGame(updatedGame);
    await loadGames();
    return game;
  };

  //   // Повышение игрока до GM
  // const promotePlayer = async (gameId: number, playerId: number): Promise<Game> => {
  //   const game = mockPromotePlayer(gameId, playerId);
  //   await loadGames();
  //   return game;
  // };

  // Получение игры по ID
  const getGameById = (gameId: number): Game | undefined => {
    return mockGetGame(gameId);
  };

  return (
    <GameContext.Provider
      value={{
        publicGames,
        userGames,
        createGame,
        joinGame,
        refreshGames: loadGames,
        getGameById,
        updateGame,
        //promotePlayer
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => useContext(GameContext);
