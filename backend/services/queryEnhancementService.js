import axios from 'axios';
import { CONFIG } from '../config/env.js';

export const enhanceQuery = async (query) => {
    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro-1:generateContent?key=${CONFIG.GEMINI_API_KEY}`,
            {
                contents: [
                    { parts: [{ text: `Enhance this search query to be more informative: "${query}"` }] }
                ]
            }
        );

        return response.data.candidates?.[0]?.content?.parts?.[0]?.text || query;
    } catch (error) {
        console.error("Error enhancing query:", error.response?.data || error.message);
        return query; // Return original query if enhancement fails
    }
};
