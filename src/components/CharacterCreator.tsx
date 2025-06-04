// src/pages/CharacterCreatorPage.tsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockJoinGame } from "../api/mockGame";

function CharacterCreator() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl shadow-lg w-full max-w-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Создание персонажа
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2">Имя персонажа</label>
            <input
              type="text"
              className="w-full p-3 bg-gray-700 text-white rounded-lg"
              placeholder="Арагорн"
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Раса</label>
            <select className="w-full p-3 bg-gray-700 text-white rounded-lg">
              <option>Человек</option>
              <option>Эльф</option>
              <option>Гном</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-2">
              История персонажа
            </label>
            <textarea
              className="w-full p-3 bg-gray-700 text-white rounded-lg min-h-[150px]"
              placeholder="Опишите предысторию..."
            />
          </div>
        </div>

        <button className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition">
          Создать персонажа
        </button>
      </div>
    </div>
  );
}

export default CharacterCreator;
