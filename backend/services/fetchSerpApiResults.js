const axios = require("axios");
const { SERP_API_KEY } = require("../config/env");

async function fetchSerpApiResults(query) {
  try {
    const response = await axios.get("https://serpapi.com/search", {
      params: {
        api_key: SERP_API_KEY,
        q: query, 
        engine: "google",  
        //location and language can be added if needed
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching results from SERP API:", error.response ? error.response.data : error.message);
    return null;
  }
}

module.exports = { fetchSerpApiResults };
