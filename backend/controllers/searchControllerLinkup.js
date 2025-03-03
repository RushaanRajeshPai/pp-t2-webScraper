// const { enhanceQuery } = require("../services/queryEnhancementService");
// const { fetchLinkupResults } = require("../services/fetchLinkupResults");

// async function searchLinkup(req, res) {
//   try {
//     const userQuery = req.query.q;
//     const enhancedQuery = await enhanceQuery(userQuery);
//     const searchResults = await fetchLinkupResults(enhancedQuery);

//     res.json({ query: enhancedQuery, results: searchResults }); // ✅ Now returns an object
//   } catch (error) {
//     console.error("Error fetching LinkUp results:", error);
//     res.status(500).json({ error: "Search failed" });
//   }
// }

// module.exports = { searchLinkup };


const { enhanceQuery } = require("../services/queryEnhancementService");
const { fetchLinkupResults } = require("../services/fetchLinkupResults");

async function searchLinkup(req, res) {
  try {
    const userQuery = req.query.q;
    if (!userQuery) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    console.log("🔍 Original Query:", userQuery);
    
    // ✅ Ensure query enhancement is optional (in case enhancement fails)
    let enhancedQuery;
    try {
      enhancedQuery = await enhanceQuery(userQuery);
      console.log("✨ Enhanced Query:", enhancedQuery);
    } catch (enhanceError) {
      console.error("⚠️ Query enhancement failed, using original query.");
      enhancedQuery = userQuery;
    }

    // Fetch LinkUp results
    const searchResults = await fetchLinkupResults(enhancedQuery);
    console.log("🔄 Fetched LinkUp Results:", searchResults);

    // ✅ Ensure response format matches the frontend's expected structure
    res.json({
      query: enhancedQuery,
      results: searchResults || { content: "No results found", sources: [] },
    });
  } catch (error) {
    console.error("❌ Error fetching LinkUp results:", error);
    res.status(500).json({ content: "Error fetching results", sources: [] });
  }
}

module.exports = { searchLinkup };
