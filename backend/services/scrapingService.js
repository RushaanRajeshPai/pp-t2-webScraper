//Puppeteer
// // import puppeteer from 'puppeteer';

// // export const scrapeFullPage = async (url) => {
// //     let browser;
// //     try {
// //         browser = await puppeteer.launch({ headless: "new" }); // Launch Puppeteer in headless mode
// //         const page = await browser.newPage();

// //         // await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 }); 
// //         await page.goto(url, { timeout: 0 });

// //         const fullContent = await page.evaluate(() => {
// //             return document.body.innerText; // Extract full text from the body
// //         });

// //         await browser.close(); // Close browser after scraping
// //         return fullContent.slice(0, 5000); // Limit content to avoid excessive text

// //     } catch (error) {
// //         if (browser) await browser.close(); // Ensure browser is closed in case of error
// //         console.error(`Error scraping ${url}:`, error);
// //         return "Content not available.";
// //     }
// // };



//Cheerio
// import axios from 'axios';
// import * as cheerio from 'cheerio'; 

// export const scrapeFullPage = async (url) => {
//     try {
//         const { data } = await axios.get(url); 
//         const $ = cheerio.load(data); 

//         const fullContent = $('body').text(); 
//         console.log(fullContent)
//         return fullContent;
        
//     } catch (error) {
//         console.error(`Error scraping ${url}:`, error);
//         return "Content not available.";
//     }
// };


//ScrapingBee
// import axios from 'axios';
// import { CONFIG } from '../config/env.js';

// export const scrapeFullPage = async (url) => {
//     if (!CONFIG.SCRAPINGBEE_API_KEY) {
//         console.error("Error: SCRAPINGBEE_API_KEY is missing.");
//         return "Content not available.";
//     }

//     if (!url || typeof url !== 'string' || url.trim().length === 0) {
//         console.error("Error: URL parameter is missing or invalid.");
//         return "Content not available.";
//     }

//     try {
//         const encodedUrl = encodeURIComponent(url.trim());

//         const response = await axios.get('https://app.scrapingbee.com/api/v1/', {
//             params: {
//                 api_key: CONFIG.SCRAPINGBEE_API_KEY,
//                 url: encodedUrl,
//                 render_js: false
//             }
//         });

//         console.log("Scraped content received:", response.data);
//         return response.data;
//     } catch (error) {
//         console.error(`Error scraping ${url}:`, error.response?.data || error.message);
//         return "Content not available.";
//     }
// };


//ScrapingBee alternative
const axios = require('axios');
const { SCRAPINGBEE_API_KEY } = require('../config/env');

async function scrapePage(url) {
    try {
        const response = await axios.get(`https://app.scrapingbee.com/api/v1/`, {
            params: { api_key: SCRAPINGBEE_API_KEY, url }
        });
        return response.data;
    } catch (error) {
        console.error('Error scraping:', error);
        throw error;
    }
}

module.exports = { scrapePage };