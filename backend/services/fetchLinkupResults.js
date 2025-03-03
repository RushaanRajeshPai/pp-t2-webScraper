const axios = require("axios");
const { LINKUP_API_KEY } = require("../config/env");

async function fetchLinkupResults(
  query,
  depth = "standard",
  outputType = "sourcedAnswer"
) {
  try {
    // If using in a Node.js environment

    // If using in browser environment, axios should be imported or loaded via script tag

    const response = await axios.post(
      "https://api.linkup.so/v1/search",
      {
        q: query,
        depth: depth,
        outputType: outputType,
      },
      {
        headers: {
          Authorization: `Bearer ${LINKUP_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🔍 Full LinkUp API Response:", response);

    if (!response || !response.data) {
      console.error("❌ No response data received from LinkUp API");
      return { content: "No data available", sources: [] };
    }

    // Process response according to the outputType
    // This structure may need adjustment based on actual API response format
    // const results = response.data.results || [];

    // Format the results
    const formattedResults = {
      content: response.data.answer || "No content available",
      sources: response.data.sources.map((item) => ({
        title: item.name || "Untitled",
        url: item.url || "#",
      })),
    };

    console.log("✅ Formatted LinkUp Results:", formattedResults);
    return formattedResults;
  } catch (error) {
    console.error("❌ Error fetching LinkUp results:", error.message);
    return { content: "No data available", sources: [] };
  }
}

module.exports = { fetchLinkupResults };

//connection error
// const axios = require("axios");
// const { LINKUP_API_KEY } = require("../config/env");

// async function fetchLinkupResults(query) {
//   try {
//     const response = await axios.post(
//       "https://api.linkup.so/search",
//       { query, num_results: 5 },
//       {
//         headers: {
//           Authorization: `Bearer ${LINKUP_API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     if (!response || !response.data) {
//       console.error("❌ No response data received from LinkUp API");
//       return { content: "No data available", sources: [] };
//     }

//     const results = response.data.results || [];

//     const formattedResults = {
//       content: results.map((item) => item.snippet || "No snippet available").join("\n\n"),
//       sources: results.map((item) => ({
//         title: item.title || "Untitled",
//         url: item.url || "#",
//       })),
//     };

//     console.log("✅ Formatted LinkUp Results:", formattedResults);
//     return formattedResults;
//   } catch (error) {
//     console.error("❌ Error fetching LinkUp results:", error.response?.data || error.message);
//     return { content: "No data available", sources: [] };
//   }
// }

// module.exports = { fetchLinkupResults };
