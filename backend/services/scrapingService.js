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

import { CONFIG } from "../config/env.js";
import { ScrapingBeeClient } from "scrapingbee";

// Create a queue for rate limiting
const queue = [];
const MAX_CONCURRENT_REQUESTS = 3; // Keep this below ScrapingBee's limit of 5
let activeRequests = 0;

// Process the queue
const processQueue = async () => {
  if (queue.length === 0 || activeRequests >= MAX_CONCURRENT_REQUESTS) {
    return;
  }

  // Get the next request from the queue
  const { url, resolve, reject } = queue.shift();
  activeRequests++;

  try {
    const client = new ScrapingBeeClient(CONFIG.SCRAPINGBEE_API_KEY);
    const response = await client.get({
      url: url,
      params: {
        render_js: false,
        premium_proxy: true,
      },
    });

    // Decode the response
    const decoder = new TextDecoder();
    const text = decoder.decode(response.data);

    // Resolve the promise with the decoded text
    resolve(text.slice(0, 10000)); // Limit to 10,000 characters
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);

    // More detailed error logging
    if (error.response && error.response.data) {
      try {
        const decoder = new TextDecoder();
        const errorText = decoder.decode(error.response.data);
        console.error("Error response:", errorText);
      } catch (decodeError) {
        console.error("Error decoding error response:", decodeError);
      }
    }

    reject("Content not available - Scraping error.");
  } finally {
    activeRequests--;
    // Process the next request in the queue
    processQueue();
  }
};

// Add a request to the queue
const queueRequest = (url) => {
  return new Promise((resolve, reject) => {
    queue.push({ url, resolve, reject });
    processQueue(); // Try to process the queue
  });
};

export const scrapeFullPage = async (url) => {
  if (!CONFIG.SCRAPINGBEE_API_KEY) {
    console.error("Error: SCRAPINGBEE_API_KEY is missing.");
    return "Content not available - API key missing.";
  }

  if (!url || typeof url !== "string" || url.trim().length === 0) {
    console.error("Error: URL parameter is missing or invalid:", url);
    return "Content not available - Invalid URL.";
  }

  try {
    // Make sure URL is properly formatted
    let formattedUrl = url.trim();
    if (
      !formattedUrl.startsWith("http://") &&
      !formattedUrl.startsWith("https://")
    ) {
      formattedUrl = "https://" + formattedUrl;
    }

    console.log(`Queuing scrape request for: ${formattedUrl}`);

    // Add the request to the queue and wait for the result
    return await queueRequest(formattedUrl);
  } catch (error) {
    console.error(`Error in scrapeFullPage for ${url}:`, error);
    return "Content not available - Scraping error.";
  }
};
