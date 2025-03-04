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
        max_tokens: 300,  //roughly 225-400 words response length
        return_citations: true, //Perplexity-specific parameter requesting source citations for claims made in the response.
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
    }));  //it picks the last word of the url as its title and replaces hyphens with spaces

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
