// Import required modules
const express = require('express');
const router = express.Router();
const Product = require('../models/product'); 
const authenticate =require('../auth');

// Get All Products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) 
  {
    res.status(500).json({ message: 'Server Error', error });
  }
});
// Get Single Product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) 
        {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Create Product (Admin Only)
router.post('/create',authenticate, async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;

    const newProduct = new Product({name,description,price,category, stock });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error)
   {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Update Product (Admin Only)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (req.user.role !== 'admin' && !updatedProduct)
        {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) 
  {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Delete Product (Admin Only)
router.delete('/:id',authenticate, async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if ( req.user.role !== 'admin' && !deletedProduct) 
        {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) 
  {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
