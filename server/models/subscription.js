const mongoose = require('mongoose');

// Define a schema for your subscription details
const subscriptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  coupon: {
    type: String,
    required: false // Adjust this as needed; true if coupon is always required
  }
});

// Create a model based on the schema
const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
