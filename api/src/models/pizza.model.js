const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    ingredients: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pizza', pizzaSchema)