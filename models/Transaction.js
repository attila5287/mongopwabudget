const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  description: {
    type: String,
    trim: true,
    required: "Enter a description",
    default: "New Transaction",
  },
  amount: {
    type: Number,
    required: "Enter an amount",
    default: "0",
  },
  category: {
    type: String,
    required: "Select a category",
    default: "out",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
