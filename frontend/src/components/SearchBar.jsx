import { useState } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 w-64"
        placeholder="Enter search query..."
      />
      <button
        onClick={handleSearch}
        className="ml-2 p-2 bg-blue-500 text-white"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
