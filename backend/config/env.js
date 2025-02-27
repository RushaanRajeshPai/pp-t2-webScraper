import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    SERP_API_KEY: process.env.SERP_API_KEY,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
};
