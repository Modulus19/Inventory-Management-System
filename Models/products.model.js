const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }, //Date and time of creation and update of the product
);

// Create a model for the product schema
const Product = mongoose.model("product", productSchema);
module.exports = Product;
