// import axios from 'axios';
// import { CONFIG } from '../config/env.js';

// export const fetchSearchResults = async (query) => {
//     try {
//         const response = await axios.get(`https://serpapi.com/search`, {
//             params: {
//                 api_key: CONFIG.SERP_API_KEY,
//                 q: query
//             }
//         });

//         return response.data.organic_results || [];
//     } catch (error) {
//         console.error("Error fetching search results:", error);
//         return [];
//     }
// };


import axios from 'axios';
import { CONFIG } from '../config/env.js';

export const fetchSearchResults = async (query) => {
    if (!CONFIG.LINKUP_API_KEY) {
        console.error("Error: LINKUP_API_KEY is missing.");
        return [];
    }

    if (!query || typeof query !== 'string' || query.trim().length === 0) {
        console.error("Error: Invalid search query.");
        return [];
    }

    try {
        const requestPayload = {
            q: query.trim(), // Ensure it's plain text
            depth: "standard",
            outputType: "searchResults",
            limit: 10
        };

        console.log("Sending API Request to Linkup:", requestPayload);

        const response = await axios.post(
            'https://api.linkup.so/v1/search',
            requestPayload,
            {
                headers: {
                    'Authorization': `Bearer ${CONFIG.LINKUP_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("Search results received:", response.data);
        return response.data.results || [];
    } catch (error) {
        console.error("Error fetching search results:", error.response?.data || error.message);
        return [];
    }
};
