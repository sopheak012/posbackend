const Order = require("../models/orderModel");
const User = require("../models/userModel");

const getTodayOverview = async (req, res) => {
  try {
    const username = req.headers.username; // Get the username from the request header

    // Check if the user exists
    const userExists = await User.exists({ username });
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate the start and end of the current day
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Find all orders for the current user placed today
    const orders = await Order.find({
      user: username,
      orderTimeStamp: { $gte: todayStart, $lte: todayEnd },
    });

    // Calculate today's sales, order count, and average order cost
    const totalSales = orders.reduce(
      (sum, order) => sum + parseFloat(order.total.toString()),
      0
    );
    const orderCount = orders.length;
    const averageOrderCost = orderCount > 0 ? totalSales / orderCount : 0;

    // Format the values to dollars and cents
    const formattedTotalSales = totalSales.toFixed(2);
    const formattedAverageOrderCost = averageOrderCost.toFixed(2);

    res.status(200).json({
      totalSales: formattedTotalSales,
      orderCount,
      averageOrderCost: formattedAverageOrderCost,
    });
  } catch (error) {
    console.error("Error retrieving today's overview:", error);

    res.status(500).json({
      error: "Failed to retrieve today's overview",
      detailedError: error.message,
    });
  }
};

module.exports = {
  getTodayOverview,
};
