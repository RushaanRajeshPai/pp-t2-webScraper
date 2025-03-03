//ScrapingBee
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