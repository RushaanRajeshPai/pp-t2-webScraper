import { useState } from "react";
import PropTypes from "prop-types";
import { fetchSearchResults } from "../services/searchService";

const SearchBar = ({ setResults }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    const data = await fetchSearchResults(query);
    console.log(data);
    setResults(data);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search here..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
};

export default SearchBar;
