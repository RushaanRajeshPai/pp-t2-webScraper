const { enhanceQuery } = require("../services/queryEnhancementService");
const { fetchSearchResults } = require("../services/fetchSearchResults");
const { fetchLinkupResults } = require("../services/fetchLinkupResults");

// const { scrapePage } = require("../services/scrapingService");

async function search(req, res) {
  try {
    const userQuery = req.query.q;
    const enhancedQuery = await enhanceQuery(userQuery);
    const searchResults = await fetchSearchResults(enhancedQuery);
    const linkupResults = await fetchLinkupResults(userQuery);
    // const scrapedData = await Promise.all(searchResults.map(scrapePage));
    res.json({ query: enhancedQuery, results: [searchResults, linkupResults] });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = { search };
