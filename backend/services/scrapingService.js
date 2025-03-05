const axios = require("axios");
const { SCRAPINGBEE_API_KEY } = require("../config/env");

async function fetchScrapingBeeResults(query) {
  try {
    const response = await axios.get(`https://app.scrapingbee.com/api/v1/?api_key=${SCRAPINGBEE_API_KEY}&url=${query}`
      // params: {
      //   api_key: SCRAPINGBEE_API_KEY,
      //   url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
      //   render_js: true,
      // },
    );


    if (!response || !response.data) {
      console.error("No response data received from ScrapingBee API");
      return { content: "No data available", sources: [] };
    }
    
    const extractedContent = response.data;
    
    //for URL extraction from content
    const sources = extractedContent.match(/https?:\/\/[^"\s]+/g) || [];
    
    const formattedSources = sources.map((url) => ({
      url,
      title: url.split("/").pop().replace(/-/g, " ") || url,
    }));

    return {
      content: extractedContent, 
      sources: formattedSources,
    };
  } catch (error) {
    console.error("Error fetching results from ScrapingBee API:", error.message);
    return { content: "No data available", sources: [] };
  }
}

module.exports = { fetchScrapingBeeResults };