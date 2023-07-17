const express = require("express");
const router = express.Router();
const { getTodayOverview } = require("../controllers/homeController");

router.get("/", getTodayOverview);

module.exports = router;
