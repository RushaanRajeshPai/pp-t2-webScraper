import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { search } from "../services/searchService";
import { fetchLinkupResults } from "../services/linkupSearchService";

function Home() {
  const [perplexityResults, setPerplexityResults] = useState([]);
  const [linkupResults, setLinkupResults] = useState([]);

  // const handleSearch = async (query) => {
  //   try {
  //     // Fetch results from Perplexity API
  //     const perplexityData = await search(query);
  //     setPerplexityResults(perplexityData.results);

  //     // Fetch results from Linkup.so API
  //     const linkupData = await fetchLinkupResults(query);
  //     setLinkupResults(linkupData);
  //   } catch (error) {
  //     console.error("Error fetching search results:", error);
  //   }
  // };

  const handleSearch = async (query) => {
    try {
      console.log("Searching for:", query);
  
      // Fetch Perplexity results
      const perplexityData = await search(query);
      console.log("Perplexity Results:", perplexityData.results);
      setPerplexityResults(perplexityData.results);
  
      // Fetch LinkUp results
      const linkupData = await fetchLinkupResults(query);
      console.log("LinkUp Results:", linkupData);
      setLinkupResults(linkupData);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Engine</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Display Perplexity API results */}
        <div>
          <h2 className="text-xl font-semibold">Perplexity Results</h2>
          <SearchResults results={perplexityResults || { sources: [] }} />
        </div>
        
        {/* Display Linkup.so API results */}
        <div>
          <h2 className="text-xl font-semibold">Linkup.so Results</h2>
          {/* <SearchResults results={linkupResults} isLinkup={true} /> */}
          <SearchResults results={linkupResults || { sources: [] }} isLinkup={true} />
        </div>
      </div>
    </div>
  );
}

export default Home;
