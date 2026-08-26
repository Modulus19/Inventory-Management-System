const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    hasAdminAccess: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["user", "superadmin", "storeowner", "salesperson"],
      default: "user",
    },

    password: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }, //Date and time of creation and update of the product
);

// Create a model for the product schema
const User = mongoose.model("user", userSchema);
module.exports = User;
