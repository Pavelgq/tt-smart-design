const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Название продукта не задано",
    },
    description: {
      type: String,
    },
    params: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema, "product");

module.exports = productModel;
