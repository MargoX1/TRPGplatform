// src/components/GameCreateForm.tsx
import React, { useState } from "react";

interface GameCreateFormProps {
  isGameCreating: boolean;
  onSubmit: (newGameTitle: string) => void;
}

const GameCreateForm: React.FC<GameCreateFormProps> = ({
  isGameCreating,
  onSubmit,
}) => {
  const [newGameTitle, setNewGameTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newGameTitle);
  };

  return (
    <div className="mb-8 bg-gray-800 p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-white mb-4">
        Создать новую игру
      </h2>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={newGameTitle}
          onChange={(e) => setNewGameTitle(e.target.value)}
          placeholder="Название вашей игры"
          className="flex-1 p-3 bg-gray-700 text-white rounded-lg"
          disabled={isGameCreating}
        />
        <button
          onClick={handleSubmit}
          disabled={isGameCreating}
          className={`
                bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition
                ${isGameCreating ? "opacity-70 cursor-not-allowed" : ""}
              `}
        >
          {isGameCreating ? "Создание..." : "Создать игру"}
        </button>
      </div>
    </div>
  );
};

export default GameCreateForm;
