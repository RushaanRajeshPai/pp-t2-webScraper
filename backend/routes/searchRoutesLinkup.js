const express = require("express");
const { searchLinkup } = require("../controllers/searchControllerLinkup");

const router = express.Router();

router.get("/search/linkup", searchLinkup);

module.exports = router;
