const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', required: true
      },
      quantity: {
        type: Number, 
         required: true, min: 1
      }
    }
  ],
  totalPrice: {
    type: Number, required: true, min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  address: {
    type: String, 
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'bank_transfer'],
    required: true
  }
});

// Create and export the model
const Order= mongoose.model('Order', orderSchema);

module.exports = Order;
