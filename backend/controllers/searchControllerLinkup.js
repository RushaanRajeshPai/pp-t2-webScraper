const { enhanceQuery } = require("../services/queryEnhancementService");
const { fetchLinkupResults } = require("../services/fetchLinkupResults");

async function searchLinkup(req, res) {
  try {
    const userQuery = req.query.q;
    const enhancedQuery = await enhanceQuery(userQuery); // Enhance query
    const searchResults = await fetchLinkupResults(enhancedQuery); // Fetch results from LinkUp API

    res.json({ query: enhancedQuery, results: searchResults });
  } catch (error) {
    console.error("Error fetching LinkUp results:", error);
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = { searchLinkup };
