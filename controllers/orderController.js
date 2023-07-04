const Order = require("../models/OrderModel");

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderTimeStamp: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the orders" });
  }
};

// Get a single order by orderNum
const getOrder = async (req, res) => {
  try {
    const { orderNum } = req.params;
    const order = await Order.findOne({ orderNum });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the order" });
  }
};

// Create a new order
const createOrder = async (req, res) => {
  try {
    const { pizzas, drinks } = req.body;

    // Calculate the total price
    let totalPrice = 0;
    if (pizzas && pizzas.length > 0) {
      totalPrice += pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
    }
    if (drinks && drinks.length > 0) {
      totalPrice += drinks.reduce((sum, drink) => sum + drink.price, 0);
    }

    // Find the maximum orderNum from the database and add 1 to it
    const maxOrderNumOrder = await Order.findOne({}, { orderNum: 1 }).sort({
      orderNum: -1,
    });
    const nextOrderNum = maxOrderNumOrder ? maxOrderNumOrder.orderNum + 1 : 1;

    // Create the order
    const order = await Order.create({
      orderNum: nextOrderNum,
      pizzas: pizzas || [],
      drinks: drinks || [],
      total: totalPrice,
      orderTimeStamp: new Date(),
    });

    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the order" });
  }
};

// Delete an order by orderNum
const deleteOrder = async (req, res) => {
  try {
    const { orderNum } = req.params;
    const order = await Order.findOne({ orderNum });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    await order.remove();
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the order" });
  }
};

// Update an order by orderNum
const updateOrder = async (req, res) => {
  try {
    const { orderNum } = req.params;
    const { pizzas, drinks } = req.body;
    const order = await Order.findOne({ orderNum });
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
    res
      .status(500)
      .json({ error: "An error occurred while updating the order" });
  }
};

// Delete all orders
const deleteAllOrders = async (req, res) => {
  try {
    await Order.deleteMany();
    res.status(200).json({ message: "All orders deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting all orders" });
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