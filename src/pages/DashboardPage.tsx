// src/pages/DashboardPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGames } from "../context/GameContext";
import GameCreateForm from "../components/GameCreateForm";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isGameCreating, setIsGameCreating] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState("");
  const [error, setError] = useState("");
  const { createGame, userGames, publicGames } = useGames();
  //const { getGameById } = useGames();

  const handleGameCreate = async () => {
    if (!newGameTitle.trim()) {
      setError("Введите название игры");
      return;
    }

    if (!user) {
      setError("Пользователь не авторизован");
      return;
    }
    setIsGameCreating(true);
    setError("");
    //в реальном приложении здесь будет API-запрос
    try {
      // Создаем игру через контекст
      const newGame = await createGame(newGameTitle);

      // Проверка успешного создания
      if (!newGame?.id) {
        throw new Error("Игра не была создана");
      }

      // 3. Переход на страницу игры
      navigate(`/game/${newGame.id}`);
    } catch (error) {
      console.error("Ошибка создания игры:", error);
      // Показать сообщение пользователю
    } finally {
      setIsGameCreating(false);
      setNewGameTitle("");
    }
  };

  // // Временная реализация
  // const createNewGame = async (title: string, creatorId: number) => {
  //   return {
  //     id: Math.floor(Math.random() * 1000),
  //     title,
  //     creatorId,
  //     players: [
  //       {
  //         userId: creatorId,
  //         role: "GM",
  //         //character: null,
  //       },
  //     ],
  //   };
  // };

  // Функция для выхода из системы
  const handleLogout = () => {
    setTimeout(() => {
      logout(); // Вызываем функцию выхода из контекста
      navigate("/"); // Перенаправляем на страницу входа
    }, 300);
  };

  if (!user) {
    // Если пользователя нет, сразу перенаправляем на вход
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Привет, {user.username}!
        </h1>
        <button
          onClick={handleLogout} // Используем новую функцию выхода
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Выйти
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <GameCreateForm
          isGameCreating={isGameCreating}
          onSubmit={handleGameCreate}
        />

        {/* Мои игры */}
        <div className="bg-gray-800 p-6 rounded-xl mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Мои игры</h2>

          {userGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition"
                  onClick={() => navigate(`/game/${game.id}`)}
                >
                  <h3 className="text-lg font-medium text-white">
                    {game.title}
                  </h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm">
                      Игроков: {game.players.length}
                    </span>
                    <span className="text-purple-400 text-sm">
                      {game.creatorId === user.id ? "Вы GM" : "Участник"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">У вас пока нет активных игр</p>
          )}
        </div>

        {/* Публичные игры */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            Доступные игры
          </h2>

          {publicGames.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {publicGames.map((game) => (
                <div
                  key={game.id}
                  className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition"
                  onClick={() => navigate(`/game/${game.id}`)}
                >
                  <h3 className="text-lg font-medium text-white">
                    {game.title}
                  </h3>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-400 text-sm">
                      Игроков: {game.players.length}
                    </span>
                    {/* <span className="text-blue-400 text-sm">
                      {game.isPublic ? "Публичная" : "Приватная"}
                    </span> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">Нет доступных игр</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
