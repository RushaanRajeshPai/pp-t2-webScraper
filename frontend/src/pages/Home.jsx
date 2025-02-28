import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";

const Home = () => {
  const [results, setResults] = useState([]);

  return (
    <div>
      <h1>AI Search Engine</h1>
      <SearchBar setResults={setResults} />
      <SearchResults results={results} />
    </div>
  );
};

export default Home;
