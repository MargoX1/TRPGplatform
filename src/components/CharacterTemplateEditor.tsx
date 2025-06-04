// src/components/CharacterTemplateEditor.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CharacterTemplateEditor = () => {
  const navigate = useNavigate();
  const [fields, setFields] = useState([
    { id: 1, name: "Имя персонажа", type: "text", required: true },
    {
      id: 2,
      name: "Раса",
      type: "select",
      options: ["Человек", "Эльф", "Гном"],
      required: true,
    },
    { id: 3, name: "Класс", type: "text", required: true },
    { id: 4, name: "Уровень", type: "number", required: true },
    { id: 5, name: "Предыстория", type: "textarea", required: false },
  ]);

  const [newField, setNewField] = useState({
    name: "",
    type: "text",
    required: true,
    options: [] as string[],
  });

  const [showAddField, setShowAddField] = useState(false);

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">
          Шаблон анкеты персонажа
        </h2>
      </div>

      {/* Список существующих полей */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-300 mb-3">
          Текущие поля анкеты
        </h3>

        <div className="space-y-2">
          {fields.map((field) => (
            <div
              key={field.id}
              className="bg-gray-700 p-3 rounded-lg flex justify-between items-center"
            >
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-white">{field.name}</span>
                  {field.required && (
                    <span className="ml-2 text-xs bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded">
                      обязательное
                    </span>
                  )}
                </div>
                <div className="text-gray-400 text-sm mt-1">
                  Тип:{" "}
                  {field.type === "select"
                    ? `Выбор (${field.options?.join(", ")})`
                    : field.type === "textarea"
                    ? "Текст (многострочный)"
                    : field.type}
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="text-gray-400 hover:text-yellow-300">
                  ✏️
                </button>
                <button className="text-gray-400 hover:text-red-400">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Добавление нового поля */}
      <div className="border-t border-gray-700 pt-4">
        <button
          onClick={() => setShowAddField(!showAddField)}
          className="flex items-center text-purple-400 hover:text-purple-300 mb-3"
        >
          <span className="mr-1">{showAddField ? "−" : "+"}</span>
          {showAddField ? "Скрыть форму" : "Добавить новое поле"}
        </button>

        {showAddField && (
          <div className="bg-gray-750 p-4 rounded-lg space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Название поля</label>
              <input
                type="text"
                value={newField.name}
                onChange={(e) =>
                  setNewField({ ...newField, name: e.target.value })
                }
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
                placeholder="Например: Возраст"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-2">Тип поля</label>
              <select
                value={newField.type}
                onChange={(e) =>
                  setNewField({ ...newField, type: e.target.value })
                }
                className="w-full p-2 bg-gray-700 text-white rounded-lg"
              >
                <option value="text">Текст (одна строка)</option>
                <option value="textarea">Текст (многострочный)</option>
                <option value="number">Число</option>
                <option value="select">Выбор из списка</option>
              </select>
            </div>

            {newField.type === "select" && (
              <div>
                <label className="block text-gray-400 mb-2">
                  Варианты выбора (через запятую)
                </label>
                <input
                  type="text"
                  value={newField.options.join(", ")}
                  onChange={(e) =>
                    setNewField({
                      ...newField,
                      options: e.target.value
                        .split(",")
                        .map((item) => item.trim()),
                    })
                  }
                  className="w-full p-2 bg-gray-700 text-white rounded-lg"
                  placeholder="Человек, Эльф, Гном, Орк"
                />
              </div>
            )}

            <div className="flex items-center">
              <input
                type="checkbox"
                id="required"
                checked={newField.required}
                onChange={(e) =>
                  setNewField({ ...newField, required: e.target.checked })
                }
                className="mr-2"
              />
              <label htmlFor="required" className="text-gray-400">
                Обязательное поле
              </label>
            </div>

            <div className="flex space-x-3">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setFields([...fields, { ...newField, id: Date.now() }]);
                  setNewField({
                    name: "",
                    type: "text",
                    required: true,
                    options: [],
                  });
                  setShowAddField(false);
                }}
              >
                Добавить поле
              </button>
              <button
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowAddField(false)}
              >
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Кнопки сохранения */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
        >
          Отменить
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Сохранить шаблон
        </button>
      </div>
    </div>
  );
};

export default CharacterTemplateEditor;
