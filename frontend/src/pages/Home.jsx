import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { search } from "../services/searchService";


function Home() {
  const [perplexityResults, setPerplexityResults] = useState({});
  const [linkupResults, setLinkupResults] = useState({}); 
  const [scrapingbeeRes, setScrapingbeeRes] = useState({});

  const handleSearch = async (query) => {

    try {
      console.log("Searching for:", query);

      const Data = await search(query);
      console.log(Data);
      console.log("Perplexity Results:", Data.results[0]);
      console.log("LinkUp Results:", Data.results[1]);
      console.log("ScrapingBee Results:", Data.results[2]); //getting no data available*

      setPerplexityResults(Data.results[0] || {});
      setLinkupResults(Data.results[1] || {});
      setScrapingbeeRes(Data.results[2] || {});


    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  console.log(perplexityResults);
  console.log(linkupResults);
  console.log(scrapingbeeRes);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Search Engine</h1>
      <SearchBar onSearch={handleSearch} />
      <div style={{ display: "flex", gap: "20px" }}>
        
        <div>
          <h2 className="text-xl font-semibold">Perplexity Results</h2>
          <SearchResults results={perplexityResults} />
        </div>

        
        <div>
          <h2 className="text-xl font-semibold">Linkup.so Results</h2>
          <SearchResults results={linkupResults} />
        </div>

        <div>
          <h2 className="text-xl font-semibold">Scrapingbee Results</h2>
          <SearchResults results={scrapingbeeRes} />
        </div>
      </div>
    </div>
  );
}

export default Home;
