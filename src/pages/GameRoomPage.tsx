// src/pages/GameRoomPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGames } from "../context/GameContext";
import { Game } from "../types/Game";

const GameRoomPage: React.FC = () => {
  // Получаем ID игры из URL
  const { id: gameIdParam } = useParams<{ id: string }>();

  // Получаем данные пользователя
  const { user } = useAuth();

  const navigate = useNavigate();
  const { getGameById, updateGame, /* promotePlayer,*/ refreshGames } =
    useGames();
  const [game, setGame] = useState<Game | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [newLocationName, setNewLocationName] = useState("");

  // Загрузка игры при монтировании или изменении ID
  useEffect(() => {
    const loadGame = async () => {
      console.log("Начало загрузки игры, gameIdParam:", gameIdParam);

      if (!gameIdParam) {
        setError("ID игры не указан");
        setIsLoading(false);
        return;
      }

      try {
        const gameId = parseInt(gameIdParam);
        const gameData = getGameById(gameId);

        if (!gameData) {
          setError("Игра не найдена");
          setIsLoading(false);
          return;
        }

        setGame(gameData);
        setError("");
      } catch (err) {
        setError("Ошибка загрузки игры");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGame();
  }, [gameIdParam, getGameById]);

  // Проверка роли текущего пользователя
  const isCurrentUserGM = () => {
    if (!game || !user) return false;
    return game.players.some((p) => p.userId === user.id && p.role === "GM");
  };

  // // Создание новой локации (только для GM)
  // const handleCreateLocation = async () => {
  //   if (!game || !newLocationName.trim()) return;

  //   try {
  //     const updatedGame = {
  //       ...game,
  //       locations: [
  //         ...(game.locations || []),
  //         {
  //           id: Math.max(0, ...(game.locations?.map((l) => l.id) || [0])) + 1,
  //           name: newLocationName,
  //           description: "",
  //           createdAt: new Date().toISOString(),
  //         },
  //       ],
  //     };

  //     await updateGame(updatedGame);
  //     setGame(updatedGame);
  //     setNewLocationName("");
  //   } catch (err) {
  //     setError("Не удалось создать локацию");
  //   }
  // };

  //   // Назначение игрока GM
  // const handlePromotePlayer = async (playerId: number) => {
  //   if (!game || !gameIdParam) return;

  //   try {
  //     const updatedGame = await promotePlayer(parseInt(gameIdParam), playerId);
  //     setGame(updatedGame);
  //   } catch (err) {
  //     setError('Не удалось изменить роль игрока');
  //   }
  // };

  // // Временные данные для примера
  // const gameData = {
  //   title: "Подземелье Дракона",
  //   description: "Старинный замок, скрывающий древние сокровища",
  //   createdAt: "2025-05-29",
  // };

  // Обновление состояния игры
  const refreshGame = async () => {
    if (!gameIdParam) return;

    try {
      await refreshGames();
      const gameId = parseInt(gameIdParam);
      const updatedGame = getGameById(gameId);
      if (updatedGame) setGame(updatedGame);
    } catch (err) {
      setError("Ошибка обновления данных");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Загрузка игры...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
        <div className="text-red-500 text-xl mb-4">{error}</div>
        <button
          onClick={() => navigate("/dashboard")}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Игра не найдена</div>
      </div>
    );
  }

  // Получение текущего игрока
  const currentPlayer = game.players.find((p) => p.userId === user?.id);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      {/* Шапка с информацией об игре */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{game.title}</h1>
          <p className="text-gray-400 text-sm">
            Игроков: {game.players.length} | Создана:{" "}
            {new Date(game.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
          >
            Назад
          </button>

          <button
            onClick={refreshGame}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Обновить
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Панель игроков */}
        <div className="lg:col-span-1 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Участники</h2>

          <div className="space-y-3">
            {game.players.map((player) => (
              <div
                key={player.userId}
                className={`p-3 rounded-lg ${
                  player.role === "GM"
                    ? "bg-purple-900/50 border border-purple-500"
                    : "bg-gray-700"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">
                      {/*player.character?.name ||*/ `Игрок #${player.userId}`}
                      {player.userId === user?.id && " (Вы)"}
                    </div>
                    <div className="text-sm text-gray-400">
                      {player.role === "GM" ? "Гейм-мастер" : "Игрок"}
                    </div>
                  </div>

                  {/* {isCurrentUserGM() && player.role !== 'GM' && (
                    <button
                      onClick={() => handlePromotePlayer(player.userId)}
                      className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Сделать GM
                    </button>
                  )} */}
                </div>
              </div>
            ))}
          </div>

          {/* Форма создания локации (только для GM) */}
          {/* {isCurrentUserGM() && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Управление игрой</h3>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newLocationName}
                  onChange={(e) => setNewLocationName(e.target.value)}
                  placeholder="Название новой локации"
                  className="flex-1 p-2 bg-gray-700 text-white rounded"
                />
                <button
                  onClick={handleCreateLocation}
                  disabled={!newLocationName.trim()}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
                >
                  Создать
                </button>
              </div>
            </div>
          )} */}
        </div>

        {/* Основная игровая зона */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Игровое пространство</h2>

          {/* Список локаций */}
          {/* <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Локации</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(game.locations || []).map((location) => (
                <div
                  key={location.id}
                  className="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"
                >
                  <div className="font-medium">{location.name}</div>
                  <div className="text-gray-400 text-sm mt-1">
                    {location.description || "Описание отсутствует"}
                  </div>
                </div>
              ))}

              {/* {(!game.locations || game.locations.length === 0) && (
                <div className="text-gray-400 col-span-full">
                  Локации не созданы.{" "}
                  {isCurrentUserGM() &&
                    "Используйте форму выше, чтобы создать новую локацию."}
                </div>
              )} */}
          {/* </div>
          </div> */}

          {/* Чат игры */}
          <div>
            <h3 className="text-lg font-medium mb-3">Чат</h3>
            <div className="bg-gray-700 rounded-lg p-4 min-h-[300px]">
              <div className="mb-4">
                <div className="text-purple-400">
                  [Система]: Добро пожаловать в игру!
                </div>
                <div className="text-blue-400 mt-2">
                  [ГМ]: Начните исследовать локации
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  placeholder="Напишите сообщение..."
                  className="flex-1 p-2 bg-gray-600 text-white rounded"
                />
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
                  Отправить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameRoomPage;
