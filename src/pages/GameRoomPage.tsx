// src/pages/GameRoomPage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const GameRoomPage = () => {
  const navigate = useNavigate();
  const isGM = true; // Заглушка: считаем пользователя ГМом
  const { gameId } = useParams();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Закрепленная шапка */}
      <div className="sticky top-0 z-10 bg-gray-800 p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Тёмные земли</h1>
            <p className="text-gray-400">
              Фэнтезийный мир с драконами и магией
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Статус пользователя с иконкой */}
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  isGM ? "bg-purple-500" : "bg-green-500"
                }`}
              ></div>
              <span
                className={`${
                  isGM ? "text-purple-300" : "text-green-300"
                } font-medium`}
              >
                {isGM ? "ГМ" : "Игрок"}
              </span>
            </div>

            {/* Разделитель */}
            <div className="h-6 w-px bg-gray-600"></div>

            {/* Кнопка выхода */}
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center text-gray-300 hover:text-white transition"
            >
              На главную
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1 rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4 flex-grow">
        {/* Левый блок: Персонажи и игроки */}
        <div className="lg:col-span-1 bg-gray-800 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">Участники</h2>
            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-sm">
              3/5
            </span>
          </div>

          {/* Список игроков */}
          <div className="space-y-3">
            {/* Игрок 1 */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-bold text-white">Margo </h3>
                <span className="text-purple-400">ГМ</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Мастер игры</p>
            </div>

            {/* Игрок 2 */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-bold text-white">Anna</h3>
                <span className="text-green-400">Игрок</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Лиана, эльфийка-маг</p>
            </div>

            {/* Игрок 3 */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex justify-between">
                <h3 className="font-bold text-white">Max</h3>
                <span className="text-green-400">Игрок</span>
              </div>
              <p className="text-gray-400 text-sm mt-1">Торг, дворф-воин</p>
            </div>
          </div>
        </div>

        {/* Центральный блок: Чат и игровой процесс */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-4 flex flex-col">
          {/* Заголовок локации */}
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-white">
              Таверна "Последний привал"
            </h2>
            <span className="ml-3 bg-yellow-500/20 text-yellow-300 text-sm px-2 py-1 rounded">
              3 игрока
            </span>
          </div>

          {/* История и чат */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-3">
            {/* Сообщение ГМа */}
            <div className="bg-purple-900/30 p-3 rounded-lg">
              <div className="flex items-center">
                <span className="font-bold text-purple-400">[ГМ]</span>
                <span className="text-gray-500 text-sm ml-2">10:42</span>
              </div>
              <p className="text-white mt-1">
                Вы слышите шум драки из дальнего угла таверны. Два гоблина
                спорят из-за куска мяса.
              </p>
            </div>

            {/* Сообщение игрока */}
            <div className="bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center">
                <span className="font-bold text-green-400">Лиана:</span>
                <span className="text-gray-500 text-sm ml-2">10:43</span>
              </div>
              <p className="text-white mt-1">
                Осматриваю гоблинов на предмет магических аур. Кастую Detect
                Magic.
              </p>
            </div>
          </div>

          {/* Поле ввода */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Введите ваше действие или реплику..."
              className="flex-1 bg-gray-700 text-white rounded-lg p-3"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
              Отправить
            </button>
          </div>
        </div>

        {/* Правый блок: Инструменты ГМа */}
        {isGM && (
          <div className="lg:col-span-1 bg-gray-800 rounded-xl p-4">
            <h2 className="text-xl font-bold text-white mb-4">
              Инструменты ГМа
            </h2>

            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                onClick={() => navigate(`/game/${gameId}/agame-access-panel`)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
              >
                Панель доступа
              </button>
              <button
                onClick={() => navigate(`/game/${gameId}/gm-console`)}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-lg"
              >
                Панель ГМа
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameRoomPage;
