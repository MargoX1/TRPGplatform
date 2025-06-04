// src/pages/GameAccessPanel.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameAccessPanelPage = () => {
  const navigate = useNavigate();
  const [isPublic, setIsPublic] = useState(true);
  const [inviteLink, setInviteLink] = useState(
    "https://tri-platform/game/123/invite"
  );

  // Заглушечные данные игроков
  const [players, setPlayers] = useState([
    { id: 1, username: "Margo", role: "gm", joined: "2023-10-01" },
    { id: 2, username: "Anna", role: "player", joined: "2023-10-02" },
    { id: 3, username: "Max", role: "player", joined: "2023-10-03" },
  ]);

  const toggleGamePrivacy = () => {
    setIsPublic(!isPublic);
    if (!isPublic) {
      // Генерация новой ссылки при переходе в приватный режим
      setInviteLink(
        `https://tri-platform/game/123/invite?token=${Math.random()
          .toString(36)
          .substr(2, 8)}`
      );
    }
  };

  const promoteToGM = (playerId: number) => {
    setPlayers(
      players.map((player) =>
        player.id === playerId ? { ...player, role: "gm" } : player
      )
    );
  };

  const kickPlayer = (playerId: number) => {
    setPlayers(players.filter((player) => player.id !== playerId));
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Шапка страницы */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Управление доступом
            </h1>
            <p className="text-gray-400">Тёмные земли</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            ← Назад
          </button>
        </div>

        {/* Настройка публичности */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Публичность игры</h2>
            <div className="flex items-center">
              <span
                className={`mr-3 ${
                  isPublic ? "text-green-400" : "text-gray-400"
                }`}
              >
                {isPublic ? "Публичная" : "Приватная"}
              </span>
              <button
                onClick={toggleGamePrivacy}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isPublic ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isPublic ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Информация о приватности */}
          {!isPublic && (
            <div className="mt-4">
              <label className="block text-gray-400 mb-2">
                Пригласительная ссылка
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={inviteLink}
                  readOnly
                  className="flex-1 bg-gray-700 text-white rounded-l-lg p-3"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(inviteLink)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-r-lg"
                >
                  Копировать
                </button>
              </div>
              <p className="text-gray-500 text-sm mt-2">
                Делитесь этой ссылкой только с теми, кого хотите добавить в игру
              </p>
            </div>
          )}
        </div>

        {/* Управление игроками */}
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Участники игры</h2>
            <span className="text-gray-400">{players.length} участников</span>
          </div>

          {/* Список игроков */}
          <div className="space-y-3">
            {players.map((player) => (
              <div
                key={player.id}
                className="bg-gray-700 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center">
                    <span className="font-bold text-white mr-3">
                      {player.username}
                    </span>
                    {player.role === "gm" && (
                      <span className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        ГМ
                      </span>
                    )}
                    {player.role === "player" && (
                      <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs">
                        Игрок
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mt-1">
                    В игре с {player.joined}
                  </p>
                </div>

                <div className="flex space-x-2">
                  {player.role === "player" && (
                    <button
                      onClick={() => promoteToGM(player.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Сделать ГМом
                    </button>
                  )}
                  {player.role === "gm" && player.username !== "Анна" && (
                    <button
                      onClick={() => promoteToGM(player.id)}
                      className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Понизить до игрока
                    </button>
                  )}
                  <button
                    onClick={() => kickPlayer(player.id)}
                    className="bg-red-600/30 hover:bg-red-500/40 text-red-300 px-3 py-1 rounded-lg text-sm"
                  >
                    Исключить
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Информационный блок */}
          <div className="mt-6 p-4 bg-blue-900/20 rounded-lg">
            <h3 className="font-bold text-blue-300 mb-2">Обратите внимание</h3>
            <ul className="text-gray-400 text-sm list-disc pl-5 space-y-1">
              <li>Только ГМ может управлять доступом к игре</li>
              <li>При исключении игрока все его персонажи будут удалены</li>
              <li>В игре должен остаться хотя бы один ГМ</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameAccessPanelPage;
