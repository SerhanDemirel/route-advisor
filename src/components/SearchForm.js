import { useState } from 'react';

function SearchForm({ onSearch }) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin.trim() && destination.trim()) {
      onSearch(origin.trim(), destination.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Nereden
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Örn: Kadıköy"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Nereye
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Örn: Taksim"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Rota Bul
      </button>
    </form>
  );
}

export default SearchForm; 