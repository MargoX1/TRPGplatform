// src/pages/DashboardPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useGames } from "../context/GameContext";
import GameCreateForm from "../components/GameCreateForm";
import GameCard from "../components/GameCard";

function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Заглушки данных для визуализации
  const myGames = [
    {
      id: "1",
      title: "Тёмные земли",
      description: "Тёмный фэнтезийный мир с драконами и магией",
      status: "active",
      playersCount: 5,
    },
    {
      id: "2",
      title: "Космические войны",
      description: "Приключения и интриги в далеком космосе",
      status: "inactive",
      playersCount: 3,
    },
  ];

  const availableGames = [
    {
      id: "3",
      title: "Тайна старого замка",
      description: "Готический хоррор в заброшенном поместье",
      status: "pending",
      playersCount: 0,
      isPublic: false,
    },
    {
      id: "4",
      title: "Пустошь 2077",
      description: "Постапокалиптический киберпанк, полный интриг и мутантов",
      status: "active",
      playersCount: 4,
      isPublic: true,
    },
  ];

  // Перенаправление неавторизованных пользователей
  if (!user) {
    navigate("/");
    return null;
  }

  const handleCreateGame = () => {
    // Логика создания игры
    console.log("Создание новой игры");
    // Временная заглушка - переход на страницу новой игры
    navigate("/game/5");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Шапка с приветствием */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">
            Добро пожаловать, {user.username}!
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleCreateGame}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Создать игру
            </button>
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
            >
              Выйти
            </button>
          </div>
        </div>

        {/* Список "Мои игры" */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Мои игры</h2>
            <span className="text-gray-400">
              {myGames.length} {myGames.length === 1 ? "игра" : "игр"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myGames.map((game) => (
              <div
                key={game.id}
                className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-white">{game.title}</h2>
                  <span
                    className={`${
                      game.status === "active"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-gray-500/20 text-gray-300"
                    } text-sm px-2 py-1 rounded`}
                  >
                    {game.status === "active" ? "Активна" : "Неактивна"}
                  </span>
                </div>

                <p className="text-gray-400 mt-2">{game.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-gray-400 text-sm">
                    👤 {game.playersCount} игроков
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Список "Доступные игры" */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Доступные игры</h2>
            <span className="text-gray-400">
              {availableGames.length}{" "}
              {availableGames.length === 1 ? "игра" : "игр"}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableGames.map((game) => (
              <div
                key={game.id}
                className="bg-gray-800 rounded-xl p-6 cursor-pointer hover:bg-gray-750 transition"
                onClick={() => navigate(`/game/${game.id}`)}
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-white">{game.title}</h2>
                  <span
                    className={`${
                      game.status === "active"
                        ? "bg-green-500/20 text-green-300"
                        : game.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : "bg-gray-500/20 text-gray-300"
                    } text-sm px-2 py-1 rounded`}
                  >
                    {game.status === "active"
                      ? "Активна"
                      : game.status === "pending"
                      ? "Ожидание"
                      : "Неактивна"}
                  </span>
                </div>

                <p className="text-gray-400 mt-2">{game.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <div className="text-gray-400 text-sm">
                    <span className="mr-2">👤 {game.playersCount} игроков</span>
                    {!game.isPublic && <span>🔒 Приватная</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
