const {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  deleteAllOrders,
} = require("../controllers/orderController");
const requireAuth = require("../middleware/requrieAuth");

const express = require("express");
const router = express.Router();

// require auth for all order routes
//router.use(requireAuth);

// Order routes
router.get("/", getOrders);
router.get("/:orderNum", getOrder);
router.post("/", createOrder);
router.delete("/:orderNum", deleteOrder);
router.put("/:orderNum", updateOrder);
router.delete("/", deleteAllOrders);

module.exports = router;
