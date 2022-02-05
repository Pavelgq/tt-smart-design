const mongoose = require("mongoose");

const paramSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  value: {
    type: String,
  },
  require: Boolean,
});

const paramModel = mongoose.model("param", paramSchema, "param");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Название продукта не задано",
    },
    description: {
      type: String,
    },
    params: [paramSchema],
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema, "product");

module.exports = { productModel, paramModel };
