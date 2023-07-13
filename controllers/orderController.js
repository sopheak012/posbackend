const Order = require("../models/orderModel");

// Get all orders
const getOrders = async (req, res) => {
  try {
    const username = req.headers.username; // Get the username from the request header

    const orders = await Order.find({ user: username }).sort({
      orderTimeStamp: -1,
    });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);

    res.status(500).json({
      error: "Failed to retrieve the orders",
      detailedError: error.message,
    });
  }
};

// Get a single order by orderNum
const getOrder = async (req, res) => {
  try {
    const username = req.headers.username; // Get the username from the request header
    const { orderNum } = req.params;
    const order = await Order.findOne({ orderNum, user: username });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);

    res.status(500).json({
      error: "Failed to retrieve the order",
      detailedError: error.message,
    });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { pizzas, drinks } = req.body;
    const username = req.headers.username; // Get the username from the request header

    // Calculate the total price
    let totalPrice = 0;
    if (pizzas && pizzas.length > 0) {
      totalPrice += pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    }
    if (drinks && drinks.length > 0) {
      totalPrice += drinks.reduce((sum, drink) => sum + drink.price, 0);
    }

    // Find the maximum orderNum for the user from the database and add 1 to it
    const maxOrderNumOrder = await Order.findOne(
      { user: username },
      { orderNum: 1 }
    ).sort({
      orderNum: -1,
    });
    const nextOrderNum = maxOrderNumOrder ? maxOrderNumOrder.orderNum + 1 : 1;

    // Create the order
    const order = await Order.create({
      orderNum: nextOrderNum,
      user: username,
      pizzas: pizzas || [],
      drinks: drinks || [],
      total: totalPrice,
      orderTimeStamp: new Date(),
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);

    res.status(500).json({
      error: "Failed to create the order",
      detailedError: error.message,
    });
  }
};

// Delete an order by orderNum
const deleteOrder = async (req, res) => {
  try {
    const { orderNum } = req.params;
    const username = req.headers.username; // Get the username from the request header

    const order = await Order.findOne({ orderNum, user: username });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.remove();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);

    res.status(500).json({
      error: "Failed to delete the order",
      detailedError: error.message,
    });
  }
};

// Update an order by orderNum
const updateOrder = async (req, res) => {
  try {
    const { orderNum } = req.params;
    const { pizzas, drinks } = req.body;
    const username = req.headers.username; // Get the username from the request header

    const order = await Order.findOne({ orderNum, user: username });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Calculate the total price
    let totalPrice = 0;
    if (pizzas && pizzas.length > 0) {
      totalPrice += pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    }
    if (drinks && drinks.length > 0) {
      totalPrice += drinks.reduce((sum, drink) => sum + drink.price, 0);
    }

    order.pizzas = pizzas || [];
    order.drinks = drinks || [];
    order.total = totalPrice;
    order.orderTimeStamp = new Date();

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);

    res.status(500).json({
      error: "Failed to update the order",
      detailedError: error.message,
    });
  }
};

// Delete all orders
const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.status(200).json({ message: "All orders deleted successfully" });
  } catch (error) {
    console.error("Error deleting all orders:", error);

    res.status(500).json({
      error: "Failed to delete all orders",
      detailedError: error.message,
    });
  }
};

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  deleteOrder,
  updateOrder,
  deleteAllOrders,
};
