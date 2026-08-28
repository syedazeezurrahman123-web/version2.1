import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, initialQuery = '', placeholder = 'Search jobs, exam name, organization...' }) => {
  const [query, setQuery] = useState(initialQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-24 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900 bg-white shadow-sm"
        />
        <Search className="w-5 h-5 text-gray-400 absolute left-3 pointer-events-none" />
        <button
          type="submit"
          className="absolute right-1.5 px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-md transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
