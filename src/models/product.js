const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  photoUrl: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 15,
  },
  description: {
    type: String,
    required: true,
    default: "woolen kniting garments for all ",
    maxLength: 25,
  },
  price: {
    type: Number,
    required: true,
    minLength: 3,
    maxLength: 5,
  },
  stock:{
    type: Number,
    default: 1,
  },
  gender: {
    type: String,
    enum: ["Men", "Women", "Unisex", "Kids"],
    default: "Unisex",
  },
  size: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
  },
}, {timestamps:true});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
