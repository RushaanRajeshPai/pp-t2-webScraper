import axios from "axios";

export async function search(query) {
  try {
    const response = await axios.get(
      `http://localhost:5004/api/search?q=${encodeURIComponent(query)}`
    );
    return response.data;
  } catch (error) {
    console.error("Search error:", error);
    throw error;
  }
}
