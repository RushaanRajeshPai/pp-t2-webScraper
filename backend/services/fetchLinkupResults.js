const axios = require("axios");
const { LINKUP_API_KEY } = require("../config/env");

async function fetchLinkupResults(query) {
  try {
    const response = await axios.post(
      "https://api.linkup.so/search",
      { query, num_results: 5 },
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

    const results = response.data.results || [];

    // Ensure content and sources are well-structured
    const formattedResults = {
      content: results.map((item) => item.snippet || "No snippet available").join("\n\n"),
      sources: results.map((item) => ({
        title: item.title || "Untitled",
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
