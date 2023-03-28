const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Add a product to the cart
router.post('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.body.userId }); // Check if cart already exists for user
    if (!cart) {
      cart = new Cart({
        userId: req.body.userId,
        products: [{ productId: req.body.productId, quantity: req.body.quantity }]
      });
    } else {
      let productIndex = cart.products.findIndex(p => p.productId === req.body.productId); // Check if product already exists in cart
      if (productIndex === -1) {
        cart.products.push({ productId: req.body.productId, quantity: req.body.quantity });
      } else {
        cart.products[productIndex].quantity += req.body.quantity;
      }
    }
    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get the cart for a user
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update the quantity of a product in the cart
router.patch('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    let productIndex = cart.products.findIndex(p => p.productId === req.params.productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Cannot find product in cart' });
    }
    cart.products[productIndex].quantity = req.body.quantity;
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Remove a product from the cart
router.delete('/:userId/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cannot find cart' });
    }
    let productIndex = cart.products.findIndex(p => p.productId === req.params.productId);
    if (productIndex === -1) {
      return res.status(404).json({ message: 'Cannot find product in cart' });
    }
    cart.products.splice(productIndex, 1);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
