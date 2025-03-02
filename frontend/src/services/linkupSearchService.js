import axios from "axios";

export async function fetchLinkupResults(query) {
  try {
    const response = await axios.get(`/api/search/linkup?q=${encodeURIComponent(query)}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching LinkUp results:", error);
    return [];
  }
}
