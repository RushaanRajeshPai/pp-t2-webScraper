import axios from 'axios';
import { CONFIG } from '../config/env.js';

export const fetchSearchResults = async (query) => {
    try {
        const response = await axios.get(`https://serpapi.com/search`, {
            params: {
                api_key: CONFIG.SERP_API_KEY,
                q: query
            }
        });

        return response.data.organic_results || [];
    } catch (error) {
        console.error("Error fetching search results:", error);
        return [];
    }
};
