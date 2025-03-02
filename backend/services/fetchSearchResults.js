// Perplexity API
const axios = require("axios");
const { PERPLEXITY_API_KEY } = require("../config/env");

async function fetchSearchResults(query) {
  try {
    const response = await axios.post(
      "https://api.perplexity.ai/chat/completions",
      {
        model: "sonar",
        messages: [
          {
            role: "system",
            content:
              "Provide informative and factual answers with relevant sources.",
          },
          {
            role: "user",
            content: query,
          },
        ],
        temperature: 0.2,
        max_tokens: 300,
        return_citations: true,
      },
      {
        headers: {
          Authorization: `Bearer ${PERPLEXITY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const sources = response.data.citations || [];
    const formattedSources = sources.map((url) => ({
      url,
      title: url.split("/").pop().replace(/-/g, " ") || url,
    }));

    return {
      content: response.data.choices[0].message.content,
      sources: formattedSources,
    };
  } catch (error) {
    console.error("Error fetching search results from Perplexity:", error);
    throw error;
  }
}

module.exports = { fetchSearchResults };
