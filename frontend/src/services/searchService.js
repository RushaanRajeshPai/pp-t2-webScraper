// import axios from 'axios';

// export const fetchSearchResults = async (query) => {
//     try {
//         const response = await axios.post('http://localhost:5000/api/search', { query });
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching search results:', error);
//         return [];
//     }
// };

import axios from 'axios';

export async function search(query) {
    try {
        const response = await axios.get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
        return response.data;
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}
