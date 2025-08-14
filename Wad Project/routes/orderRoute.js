// Import required modules
const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authenticate = require('../auth'); 

// place Order (Logged-in user)
router.post('/orders', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'user')
      {
   return res.status(403).json({ message: 'Only user(customer) can place order' });
 }
    const { userId, products, totalPrice, address, paymentMethod } = req.body;

    const newOrder = new Order({userId,products,totalPrice,address,paymentMethod });

    const response = await newOrder.save();
    console.log(response);
    res.status(201).json({
      orderId: response._id,
      status: 'Order placed successfully'
    });
   
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Get User Orders (Logged-in user)
router.get('/orders/user', authenticate, async (req, res) => {
  try {
    
    if (req.user.role !== 'user')
      {
   return res.status(403).json({ message: 'Unauthorized' });
 }
    
    const userId = req.user.id; 

    const orders = await Order.find({ userId });
    console.log(response);

    res.status(200).json(orders);
  } catch (error)
   {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Update Order Status (Admin only)
router.put('/orders/:id', authenticate, async (req, res) => {
  try {
    if (req.user.role !== 'admin')
         {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { status } = req.body;
    const orderId = req.params.id;

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!updatedOrder) 
        {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      orderId: updatedOrder._id,
      status: 'Order status updated successfully'
    });
  } catch (error)
   {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
