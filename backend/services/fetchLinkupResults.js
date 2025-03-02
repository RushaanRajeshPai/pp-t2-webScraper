const axios = require("axios");
const { LINKUP_API_KEY } = require("../config/env");

async function fetchLinkupResults(query) {
  try {
    const response = await axios.post(
      "https://api.linkup.so/search", 
      {
        query: query,
        num_results: 5, 
      },
      {
        headers: {
          Authorization: `Bearer ${LINKUP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const results = response.data.results || [];
    const formattedResults = results.map((item) => ({
      title: item.title || "Untitled",
      url: item.url,
      snippet: item.snippet || "No description available",
    }));

    return formattedResults;
  } catch (error) {
    console.error("Error fetching search results from Linkup.so:", error);
    return [];
  }
}

module.exports = { fetchLinkupResults };
