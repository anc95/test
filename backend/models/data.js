const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema(
  {
    ids: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    card: {
      type: String,
      required: true,
    },
    expiry: {
      type: String,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    by: {
      type: String,
      required: true,
    },
    cpr: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const data = new mongoose.model('data', registerSchema);

module.exports = data;
