// src/pages/GMConsolePage.tsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import LocationEditor from "../components/LocationEditor";
import CharacterTemplateEditor from "../components/CharacterTemplateEditor";

const GMConsolePage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Панель ГМа</h1>
            <p className="text-gray-400">Тёмные земли</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            ← Назад
          </button>
        </div>

        <LocationEditor />
        <CharacterTemplateEditor />
      </div>
    </div>
  );
};

export default GMConsolePage;
