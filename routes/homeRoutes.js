const express = require("express");
const router = express.Router();
const { getTodayOverview } = require("../controllers/homeController");
const requireAuth = require("../middleware/requrieAuth");

//auth required for the routes
router.use(requireAuth);

//home routes
router.get("/", getTodayOverview);

module.exports = router;
