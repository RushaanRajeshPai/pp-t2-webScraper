// import React, { useState } from 'react';
// import SearchBar from '../components/SearchBar';
// import SearchResults from '../components/SearchResults';

// const Home = () => {
//     const [results, setResults] = useState([]);

//     return (
//         <div>
//             <h1>AI Search Engine</h1>
//             <SearchBar setResults={setResults} />
//             <SearchResults results={results} />
//         </div>
//     );
// };

// export default Home;

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { search } from "../services/searchService";

function Home() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const data = await search(query);
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Engine</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", gap: "20px" }}>
        <SearchResults results={results} />
        <SearchResults results={results} />
      </div>
    </div>
  );
}

export default Home;
