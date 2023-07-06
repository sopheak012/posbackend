const express = require("express");
const {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
  deleteAllOrders,
} = require("../controllers/orderController");

const router = express.Router();

// Order routes
router.get("/", getOrders);
router.get("/:orderNum", getOrder);
router.post("/", createOrder);
router.delete("/:orderNum", deleteOrder);
router.put("/:orderNum", updateOrder);
router.delete("/", deleteAllOrders);

module.exports = router;
