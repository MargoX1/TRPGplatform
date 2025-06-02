// src/pages/JoinGamePage.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockJoinGame } from "../api/mockGame";

const JoinGamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [characterName, setCharacterName] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");

  const handleJoin = async () => {
    if (!user || !gameId || !characterName) return;

    setIsJoining(true);
    setError("");

    try {
      // Присоединяемся как игрок (по умолчанию)
      await mockJoinGame(parseInt(gameId), user.id /*, characterName*/);
      navigate(`/game/${gameId}`);
    } catch (err) {
      setError("Не удалось присоединиться к игре");
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">
          Присоединение к игре
        </h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-400 mb-2">
            Имя вашего персонажа
          </label>
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg"
            placeholder="Введите имя персонажа"
          />
        </div>

        <button
          onClick={handleJoin}
          disabled={isJoining || !characterName}
          className={`w-full bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition
            ${
              isJoining ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700"
            }`}
        >
          {isJoining ? "Присоединение..." : "Присоединиться к игре"}
        </button>
      </div>
    </div>
  );
};

export default JoinGamePage;
