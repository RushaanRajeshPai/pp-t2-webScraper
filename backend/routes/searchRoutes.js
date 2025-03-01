// import express from 'express';
// import { search } from '../controllers/searchController.js';

// const router = express.Router();

// router.post('/', search);

// export default router;

const express = require('express');
const { search } = require('../controllers/searchController');
const router = express.Router();

router.get('/search', search);

module.exports = router;