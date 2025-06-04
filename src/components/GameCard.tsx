// src/components/GameCard.tsx
import React from "react";

interface GameCardProps {
  title: string;
  description: string;
  status: "active" | "inactive";
  onManage: () => void;
  onPlay: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  status,
  onManage,
  onPlay,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <span
          className={`${
            status === "active"
              ? "bg-green-500/20 text-green-300"
              : "bg-yellow-500/20 text-yellow-300"
          } text-sm px-2 py-1 rounded`}
        >
          {status === "active" ? "Активна" : "Неактивна"}
        </span>
      </div>
      <p className="text-gray-400 mt-2">{description}</p>

      <div className="mt-4 flex space-x-3">
        <button
          onClick={onManage}
          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-sm"
        >
          Управление
        </button>
        <button
          onClick={onPlay}
          className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
        >
          Войти в игру
        </button>
      </div>
    </div>
  );
};

export default GameCard;
