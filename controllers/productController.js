const Product = require("../models/product");

exports.createProduct = async (req, res) => {
  try {
    // console.log(req.file.size) // 1mb =1000000 == 10^6
    // console.log(Math.pow(10 , 6))
    if(req.file.size > Math.pow(10 , 6)){
      return res.status(400).json({
        error : 'Image should be less than 1mb in size'
      })
    }
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
    res
      .status(201)
      .json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
};
