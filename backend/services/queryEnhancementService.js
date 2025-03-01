// import axios from 'axios';
// import { CONFIG } from '../config/env.js';

// export const enhanceQuery = async (query) => {
//     if (!CONFIG.GEMINI_API_KEY) {
//         console.error("Error: GEMINI_API_KEY is missing.");
//         return query;
//     }

//     try {
//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`,
//             {
//                 contents: [
//                     { role: "user", parts: [{ text: `Enhance this search query to be more informative but concise for web search: "${query}"` }] }
//                 ],
//                 generationConfig: {
//                     temperature: 0.7,
//                     maxOutputTokens: 30  // Reduce tokens to avoid excessive responses
//                 }
//             }
//         );

//         console.log("Gemini API Response:", response.data);

//         if (response.data?.candidates?.length > 0) {
//             const enhancedQuery = response.data.candidates[0]?.content?.parts[0]?.text;
            
//             // Ensure enhanced query is concise and valid
//             if (typeof enhancedQuery === 'string' && enhancedQuery.trim().length > 0) {
//                 return enhancedQuery.trim();
//             }
//         }

//         console.warn("Warning: Gemini API response did not return a valid enhanced query.");
//         return query;
//     } catch (error) {
//         console.error("Error enhancing query:", error.response?.data || error.message);
//         return query; // Return original query if enhancement fails
//     }
// };


const axios = require('axios');
const { GEMINI_API_KEY } = require('../config/env');

async function enhanceQuery(query) {
    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText',
            {
                prompt: { text: `Enhance this search query: ${query}` },
            },
            {
                headers: { 
                    'Authorization': `Bearer ${GEMINI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return response.data?.candidates?.[0]?.output || query;
    } catch (error) {
        console.error('Error enhancing query using Gemini:', error);
        throw error;
    }
}

module.exports = { enhanceQuery };
