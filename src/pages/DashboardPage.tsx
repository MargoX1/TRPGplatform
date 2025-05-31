// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isCreating, setIsCreating] = useState(false);

  const createGame = () => {
    setIsCreating(true);
    
    // Имитация задержки создания игры (в реальном приложении здесь будет API-запрос)
    setTimeout(() => {
      // Генерируем случайный ID для новой игры
      const newGameId = Math.floor(Math.random() * 1000);
      // Переходим на страницу новой игры
      navigate(`/game/${newGameId}`);
      setIsCreating(false);
    }, 1000);
  };

   // Функция для выхода из системы
  const handleLogout = () => {
      setTimeout(() => {
    logout(); // Вызываем функцию выхода из контекста
    navigate('/'); // Перенаправляем на страницу входа
  }, 300);
  };

  if (!user) {
    // Если пользователя нет, сразу перенаправляем на вход
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Привет, {user.name}!
        </h1>
        <button 
          onClick={handleLogout} // Используем новую функцию выхода
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
        >
          Выйти
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <button
          onClick={createGame}
          disabled={isCreating}
          className={`
            bg-purple-600 hover:bg-purple-700 text-white font-bold w-full py-4 rounded-lg mb-8 transition
            ${isCreating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
          `}
        >
          {isCreating ? (
            <div className="flex items-center justify-center">
              <span className="animate-spin rounded-full h-6 w-6 border-t-2 border-white mr-3"></span>
              Создание игры...
            </div>
          ) : (
            '+ Создать новую игру'
          )}
        </button>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold text-white mb-4">Активные игры</h2>
                    {/* Временный список игр */}
          <div className="space-y-3">
            <div 
              className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition"
              onClick={() => navigate('/game/123')}
            >
              <h3 className="text-lg font-medium text-white">Подземелье Дракона</h3>
              <p className="text-gray-400">ID: 123 | Статус: Активна</p>
            </div>
            
            <div 
              className="bg-gray-700 p-4 rounded-lg cursor-pointer hover:bg-gray-600 transition"
              onClick={() => navigate('/game/456')}
            >
              <h3 className="text-lg font-medium text-white">Тайны Старого Леса</h3>
              <p className="text-gray-400">ID: 456 | Статус: Завершена</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;