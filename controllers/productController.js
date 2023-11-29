const Product = require("../models/product");
const fs = require('fs')

exports.createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      photo: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category: req.body.category,
    });
    await product.save();

    res.json({ message: "Product created successfully", product });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
