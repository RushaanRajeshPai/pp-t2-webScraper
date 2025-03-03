// import { useState } from "react";
// import SearchBar from "../components/SearchBar";
// import SearchResults from "../components/SearchResults";
// import { search } from "../services/searchService";
// import { fetchLinkupResults } from "../services/linkupSearchService";

// function Home() {
//   const [perplexityResults, setPerplexityResults] = useState({});  // ✅ Initialize as an object
//   const [linkupResults, setLinkupResults] = useState([]); // ✅ LinkUp API returns an array

//   const handleSearch = async (query) => {
//     try {
//       console.log("Searching for:", query);
  
//       // Fetch Perplexity results
//       const perplexityData = await search(query);
//       console.log("Perplexity Results:", perplexityData.results);
//       setPerplexityResults(perplexityData.results || {});  // ✅ Ensure it's an object
  
//       // Fetch LinkUp results
//       const linkupData = await fetchLinkupResults(query);
//       console.log("LinkUp Results:", linkupData);
//       setLinkupResults(linkupData || []);  // ✅ Ensure it's an array
//     } catch (error) {
//       console.error("Error fetching search results:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold">Search Engine</h1>
//       <SearchBar onSearch={handleSearch} />
//       <div style={{ display: "flex", gap: "20px" }}>
//         {/* Display Perplexity API results */}
//         <div>
//           <h2 className="text-xl font-semibold">Perplexity Results</h2>
//           <SearchResults results={perplexityResults} />  {/* ✅ Now passing an object */}
//         </div>
        
//         {/* Display Linkup.so API results */}
//         <div>
//           <h2 className="text-xl font-semibold">Linkup.so Results</h2>
//           <SearchResults results={linkupResults} isLinkup={true} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;


import { useState } from "react";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import { search } from "../services/searchService";
import { fetchLinkupResults } from "../services/linkupSearchService";

function Home() {
  const [perplexityResults, setPerplexityResults] = useState({});
  const [linkupResults, setLinkupResults] = useState({}); // ✅ Now an object

  const handleSearch = async (query) => {
    // try {
    //   console.log("Searching for:", query);

    //   // Fetch Perplexity results
    //   const perplexityData = await search(query);
    //   console.log("Perplexity Results:", perplexityData.results);
    //   setPerplexityResults(perplexityData.results || {});

    //   // Fetch LinkUp results
    //   const linkupData = await fetchLinkupResults(query);
    //   console.log("LinkUp Results:", linkupData);
    //   setLinkupResults(linkupData || {}); // ✅ Ensure object format
    // } catch (error) {
    //   console.error("Error fetching search results:", error);
    // }
    
    try {
      console.log("🔎 Searching for:", query);
  
      // Fetch Perplexity results
      const perplexityData = await search(query);
      console.log("✅ Perplexity Results:", perplexityData.results);
      setPerplexityResults(perplexityData.results || {});
  
      // Fetch LinkUp results
      const linkupData = await fetchLinkupResults(query);
      console.log("🚨 LinkUp Results:", linkupData);
  
      // Explicitly ensure `setLinkupResults` receives an object
      if (linkupData && typeof linkupData === "object") {
        setLinkupResults(linkupData);
      } else {
        console.error("❌ Unexpected LinkUp result format:", linkupData);
        setLinkupResults({ content: "No data available", sources: [] });
      }
    } catch (error) {
      console.error("❌ Error fetching search results:", error);
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
          <SearchResults results={perplexityResults} />
        </div>

        {/* Display Linkup.so API results */}
        <div>
          <h2 className="text-xl font-semibold">Linkup.so Results</h2>
          <SearchResults results={linkupResults} />
        </div>
      </div>
    </div>
  );
}

export default Home;
