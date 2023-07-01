const express = require("express");
const Order = require("../models/OrderModel");
const {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");

const router = express.Router();

// Order routes
router.get("/", getOrders);
router.get("/:orderNum", getOrder);
router.post("/", createOrder);
router.delete("/:orderNum", deleteOrder);
router.put("/:orderNum", updateOrder);

module.exports = router;
