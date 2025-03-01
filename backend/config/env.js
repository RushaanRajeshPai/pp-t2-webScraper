// import dotenv from 'dotenv';
// dotenv.config();

// export const CONFIG = {
//     GEMINI_API_KEY: process.env.GEMINI_API_KEY,
//     SCRAPINGBEE_API_KEY: process.env.SCRAPINGBEE_API_KEY,
//     PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,  
// };

require('dotenv').config();

module.exports = {
    PERPLEXITY_API_KEY: process.env.PERPLEXITY_API_KEY,
    SCRAPINGBEE_API_KEY: process.env.SCRAPINGBEE_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};