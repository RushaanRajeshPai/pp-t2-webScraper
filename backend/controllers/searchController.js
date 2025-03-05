const { enhanceQuery } = require("../services/queryEnhancementService");
const { fetchSearchResults } = require("../services/fetchSearchResults");
const { fetchLinkupResults } = require("../services/fetchLinkupResults");
const { fetchScrapingBeeResults } = require("../services/scrapingService");
const { fetchSerpApiResults } = require("../services/fetchSerpApiResults");
const { getGeminiAnswer } = require("../services/fetchGeminiAnswers");

async function search(req, res) {
  try {
    const userQuery = req.query.q;
    const enhancedQuery = await enhanceQuery(userQuery);
    const searchResults = await fetchSearchResults(enhancedQuery);
    const linkupResults = await fetchLinkupResults(enhancedQuery);
    const serpApiResults = await fetchSerpApiResults(enhancedQuery);
    // console.log(serpApiResults)
    // console.log(serpApiResults.related_questions);
    // console.log(serpApiResults.organic_results);
    const scrapingbeeResult1 = await Promise.all(
      serpApiResults.related_questions.map(
        (item, index) => index < 2 && fetchScrapingBeeResults(item.link)
      )
    );

    const scrapingbeeResult2 = await Promise.all(
      serpApiResults.organic_results.map(
        (item, index) => index < 2 && fetchScrapingBeeResults(item.link)
      )
    );

    console.log(scrapingbeeResult1)
    console.log(scrapingbeeResult2)

    const content = scrapingbeeResult1.concat(scrapingbeeResult2)
      .map((result) => result.content) //extracts only the content from result 
      .filter(Boolean) //so that we dont face probs with null values
      .join("\n\n"); //leave line

    const generatedAnswer = await getGeminiAnswer(content);
    // const scrapingbeeRes = {
    //   content: generatedAnswer,
    //   sources: serpApiResults
    // }

    // const scrapingbeeRes = {
    //   content: generatedAnswer,
    //   sources: serpApiResults.organic_results.map((item) => ({
    //     url: item.link,
    //     title: item.title || item.link,
    //   }))
    // };

    const scrapingbeeRes = {
      content: generatedAnswer,
      sources: [
        ...serpApiResults.organic_results.map((item) => ({
          url: item.link,
          title: item.title || item.link, // Use title if available
        })),
        ...serpApiResults.related_questions.map((item) => ({
          url: item.link,
          title: item.question || item.link, // Use question text as title if available
        }))
      ]
    };
    
    res.json({ query: enhancedQuery, results: [searchResults, linkupResults, scrapingbeeRes] });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
}

module.exports = { search };
