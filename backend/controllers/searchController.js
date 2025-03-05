const { enhanceQuery } = require("../services/queryEnhancementService");
const { fetchSearchResults } = require("../services/fetchSearchResults");
const { fetchLinkupResults } = require("../services/fetchLinkupResults");
const { fetchScrapingBeeResults } = require("../services/scrapingService");

async function search(req, res) {
  try {
    const userQuery = req.query.q;
    const enhancedQuery = await enhanceQuery(userQuery);
    const searchResults = await fetchSearchResults(enhancedQuery);
    const linkupResults = await fetchLinkupResults(enhancedQuery);
    const serpApiResults = await fetchSerpApiResults(enhancedQuery);
    const scrapingbeeResults = await Promise.all(
      serpApiResults.sources.map(
        (item, index) => index < 1 && fetchScrapingBeeResults(item.url)
      )
    );
    const generatedAnswer = await getGeminiAnswer(content);
    const scrapingbeeRes = {
      content: generatedAnswer,
      sources: serpApiResults
    }
    res.json({ query: enhancedQuery, results: [searchResults, linkupResults, scrapingbeeResults, scrapingbeeRes] });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = { search };
