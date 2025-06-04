// src/components/GameList.tsx
import React from "react";
import { Game } from "../types/Game";
import GameCard from "./GameCard";

interface GameListProps {
  games: Game[];
  showJoinButton?: boolean;
}

const GameList: React.FC<GameListProps> = ({
  games,
  showJoinButton = false,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* {games.map(game => (
        <GameCard 
          key={game.id} 
          game={game} 
          showJoinButton={showJoinButton} 
        />
      ))} */}
    </div>
  );
};

export default GameList;
