import { enhanceQuery } from '../services/queryEnhancementService.js';
import { fetchSearchResults } from '../services/fetchSearchResults.js'; // Now using Perplexity API
import { scrapeFullPage } from '../services/scrapingService.js';

export const search = async (req, res) => {
    try {
        const { query } = req.body;

        // Step 1: Enhance the query using Gemini API
        const enhancedQuery = await enhanceQuery(query);

        // Step 2: Fetch search results using Perplexity API
        const searchResults = await fetchSearchResults(enhancedQuery);

        // Step 3: Scrape full content from top search results
        const scrapedResults = await Promise.all(
            searchResults.map(async (result) => ({
                title: result.title,
                link: result.url,  // Adjusted field name
                snippet: result.snippet,
                fullContent: await scrapeFullPage(result.url),
            }))
        );

        res.json(scrapedResults);
    } catch (error) {
        res.status(500).json({ message: 'Error processing search', error });
    }
};
