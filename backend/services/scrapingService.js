// import puppeteer from 'puppeteer';

// export const scrapeFullPage = async (url) => {
//     let browser;
//     try {
//         browser = await puppeteer.launch({ headless: "new" }); // Launch Puppeteer in headless mode
//         const page = await browser.newPage();

//         // await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 }); 
//         await page.goto(url, { timeout: 0 });

//         const fullContent = await page.evaluate(() => {
//             return document.body.innerText; // Extract full text from the body
//         });

//         await browser.close(); // Close browser after scraping
//         return fullContent.slice(0, 5000); // Limit content to avoid excessive text

//     } catch (error) {
//         if (browser) await browser.close(); // Ensure browser is closed in case of error
//         console.error(`Error scraping ${url}:`, error);
//         return "Content not available.";
//     }
// };

import axios from 'axios';
import * as cheerio from 'cheerio'; 

export const scrapeFullPage = async (url) => {
    try {
        const { data } = await axios.get(url); 
        const $ = cheerio.load(data); 

        const fullContent = $('body').text(); 
        console.log(fullContent)
        return fullContent;
        
    } catch (error) {
        console.error(`Error scraping ${url}:`, error);
        return "Content not available.";
    }
};
