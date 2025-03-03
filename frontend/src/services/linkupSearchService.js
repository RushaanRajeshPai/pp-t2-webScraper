import axios from "axios";

export async function fetchLinkupResults(query) {
  try {
    const response = await axios.get(`/api/search/linkup?q=${encodeURIComponent(query)}`);

    console.log("🚀 LinkUp API Response in Frontend:", response.data); // Debugging log

    // Ensure the response is structured correctly
    return response.data || { content: "No data available", sources: [] };
  } catch (error) {
    console.error("❌ Error fetching LinkUp results:", error);
    return { content: "No data available", sources: [] }; // Return object instead of array
  }
}
