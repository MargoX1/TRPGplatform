// src/pages/GameRoomPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User } from '../types/User';

const GameRoomPage: React.FC = () => {
  // Получаем ID игры из URL
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // Получаем данные пользователя
  const { user } = useAuth();
  
  // Временные данные для примера
  const gameData = {
    title: "Подземелье Дракона",
    description: "Старинный замок, скрывающий древние сокровища",
    createdAt: "2025-05-29"
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-8">
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
        >
          ← Назад к играм
        </button>
        
        <h1 className="text-2xl font-bold text-center">
          {gameData.title}
        </h1>
        
        <div className="w-32"></div> {/* Для выравнивания */}
      </div>

      <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-500 mb-2">
            Игровая комната
          </h2>
          <p className="text-gray-400">
            Страница игры находится в разработке
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Информация об игре</h3>
            <p>ID: {id}</p>
            <p>Создана: {gameData.createdAt}</p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Ваша роль</h3>
            <p className={user?.role === 'GM' ? 'text-purple-400' : 'text-teal-400'}>
              {user?.role === 'GM' ? 'Гейм-мастер' : 'Игрок'}
            </p>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">Статус</h3>
            <p className="text-yellow-400">В разработке</p>
          </div>
        </div>

        <div className="text-center py-10 border-2 border-dashed border-gray-600 rounded-lg">
          <p className="text-xl">Здесь скоро появится игровой интерфейс!</p>
          <p className="text-gray-500 mt-2">
            Чат, локации, персонажи и другие функции RPG платформы
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameRoomPage;