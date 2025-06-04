function LocationEditor() {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-white mb-4">
        Управление локациями
      </h2>

      <div className="flex space-x-3 mb-4">
        <input
          type="text"
          placeholder="Название локации"
          className="flex-1 p-2 bg-gray-700 text-white rounded-lg"
        />
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg">
          Добавить
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
          <span className="text-white">Таверна "Последний привал"</span>
          <div>
            <button className="text-gray-400 hover:text-white mr-2">✏️</button>
            <button className="text-red-400 hover:text-red-300">🗑️</button>
          </div>
        </div>
        <div className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
          <span className="text-white">Тёмный лес</span>
          <div>
            <button className="text-gray-400 hover:text-white mr-2">✏️</button>
            <button className="text-red-400 hover:text-red-300">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationEditor;
