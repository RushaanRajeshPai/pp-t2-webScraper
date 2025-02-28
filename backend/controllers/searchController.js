import { enhanceQuery } from "../services/queryEnhancementService.js";
import { fetchSearchResults } from "../services/fetchSearchResults.js";
import { scrapeFullPage } from "../services/scrapingService.js";

export const search = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || typeof query !== "string" || query.trim().length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid or missing query parameter" });
    }

    console.log(`Processing search request for query: "${query}"`);

    // Step 1: Enhance the query using Gemini API
    const enhancedQuery = await enhanceQuery(query);
    console.log(`Enhanced query: "${enhancedQuery}"`);

    // Step 2: Fetch search results using Linkup API
    const searchResults = await fetchSearchResults(enhancedQuery);
    console.log(`Received ${searchResults.length} search results`);

    // Step 3: Scrape content from search results (one by one to avoid rate limiting)
    const resultsWithContent = [];

    for (const result of searchResults) {
      try {
        console.log(`Scraping content from: ${result.url}`);
        const content = await scrapeFullPage(result.url);

        resultsWithContent.push({
          ...result,
          content:
            content && content !== "Content not available - Scraping error."
              ? content
              : "Content could not be retrieved from this source.",
        });
      } catch (error) {
        console.error(`Error processing result for ${result.url}:`, error);
        resultsWithContent.push({
          ...result,
          content: "Error retrieving content from this source.",
        });
      }
    }

    // Step 4: Send the combined results back to the client
    res.json({
      originalQuery: query,
      enhancedQuery: enhancedQuery,
      results: resultsWithContent,
    });
  } catch (error) {
    console.error("Error in search controller:", error);
    res.status(500).json({
      message: "Error processing search",
      error: error.message || "Unknown error",
    });
  }
};
