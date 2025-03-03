const express = require("express");
const { fetchLinkupResults } = require("../services/fetchLinkupResults");

const router = express.Router();

// ✅ Define the LinkUp search route
router.get("/search/linkup", async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const results = await fetchLinkupResults(query);
    console.log("🔄 Sending LinkUp results to frontend:", results);
    res.json(results);
  } catch (error) {
    console.error("❌ Error fetching LinkUp results:", error);
    res.status(500).json({ content: "Error fetching results", sources: [] });
  }
});

module.exports = router;

//connection error
// const express = require("express");
// const { searchLinkup } = require("../controllers/searchControllerLinkup");
// const router = express.Router();

// router.get("/search/linkup", searchLinkup);

// module.exports = router;