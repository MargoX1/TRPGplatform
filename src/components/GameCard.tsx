// src/components/GameCard.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Game } from "../types/Game";
import { useAuth } from "../context/AuthContext";
import { useGames } from "../context/GameContext";

interface GameCardProps {
  game: Game;
  showJoinButton?: boolean;
}

const GameCard: React.FC<GameCardProps> = ({
  game,
  showJoinButton = false,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { joinGame } = useGames();
  const [isJoining, setIsJoining] = useState(false);
  const [characterName, setCharacterName] = useState("");

  const isParticipant = game.players.some((p) => p.userId === user?.id);
  const isCreator = game.creatorId === user?.id;

  const handleJoinGame = async () => {
    if (!characterName.trim() || !user) return;

    setIsJoining(true);
    try {
      await joinGame(game.id /*, characterName*/);
      navigate(`/game/${game.id}`);
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="bg-gray-700 p-4 rounded-lg border border-gray-600">
      <h3 className="text-lg font-medium text-white mb-2">{game.title}</h3>

      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm">
          Игроков: {game.players.length}
        </span>
        <span className="text-gray-400 text-sm">
          {isCreator ? "Создатель" : isParticipant ? "Участник" : "Доступно"}
        </span>
      </div>

      {showJoinButton && !isParticipant && (
        <div className="mt-3">
          <input
            type="text"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            placeholder="Имя персонажа"
            className="w-full p-2 mb-2 bg-gray-600 text-white rounded"
          />
          <button
            onClick={handleJoinGame}
            disabled={isJoining || !characterName.trim()}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded disabled:opacity-50"
          >
            {isJoining ? "Присоединение..." : "Присоединиться"}
          </button>
        </div>
      )}

      {(isParticipant || isCreator) && (
        <button
          onClick={() => navigate(`/game/${game.id}`)}
          className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded"
        >
          Перейти к игре
        </button>
      )}

      {isCreator && (
        <div className="mt-3 text-center">
          <span className="text-gray-400 text-sm">
            Ссылка для приглашения: {window.location.origin}/join/{game.id}
          </span>
        </div>
      )}
    </div>
  );
};

export default GameCard;
