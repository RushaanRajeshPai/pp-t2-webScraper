import axios from "axios";

export const fetchSearchResults = async (query) => {
  try {
    const response = await axios.post("http://localhost:5003/api/search", {
      query,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    return [];
  }
};
