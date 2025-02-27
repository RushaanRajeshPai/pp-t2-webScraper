import React, { useState } from 'react';
import { fetchSearchResults } from '../services/searchService';

const SearchBar = ({ setResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async () => {
        const data = await fetchSearchResults(query);
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

export default SearchBar;
