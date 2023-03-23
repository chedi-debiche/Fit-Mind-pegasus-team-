const express = require('express');
const router = express.Router();
const multer = require('multer'); // Add this line

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // specify the upload directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // use the original filename
  }
});

const upload = multer({ storage: storage }); // create the Multer object

const Product = require('../models/products');

// Create a new product with image upload
router.post('/', upload.single('image'), async (req, res) => {
    try {
      const product = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.file.filename, // store the filename in the database
        quantity: req.body.quantity
      });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single product
router.get('/:id', getProduct, (req, res) => {
  res.json(res.product);
});

// Update a product with image upload
router.patch('/:id', getProduct, upload.single('image'), async (req, res) => {
    if (req.body.name != null) {
      res.product.name = req.body.name;
    }
    if (req.body.description != null) {
      res.product.description = req.body.description;
    }
    if (req.body.price != null) {
      res.product.price = req.body.price;
    }
    if (req.file != null) { // check if file was uploaded
      res.product.image = req.file.filename; // store the new filename
    }
    if (req.body.quantity != null) {
      res.product.quantity = req.body.quantity;
    }
    try {
      const updatedProduct = await res.product.save();
      res.json(updatedProduct);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
// Delete a product
router.delete('/:id', getProduct, async (req, res) => {
  try {
    await res.product.remove();
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Middleware function to get a product by ID
async function getProduct(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }
    res.product = product;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = router;
