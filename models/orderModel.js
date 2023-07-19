const mongoose = require("mongoose");

//order model
const Schema = mongoose.Schema;
const Decimal128 = mongoose.Decimal128;

const pizzaSchema = new Schema({
  toppings: {
    type: [String],
    required: true,
  },
  price: {
    type: Decimal128,
    required: true,
  },
});

const drinkSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Decimal128,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    orderNum: {
      type: Number,
      required: true,
    },
    user: {
      type: String, // Changed the type to String
      required: true,
    },
    pizzas: {
      type: [pizzaSchema],
      required: true,
    },
    drinks: {
      type: [drinkSchema],
      required: true,
    },
    total: {
      type: Decimal128,
      required: true,
    },
    orderTimeStamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
