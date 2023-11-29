const Product = require("../models/product");
const Joi = require("joi");

exports.createProduct = async (req, res) => {
  try {
    // console.log(req.file.size) // 1mb =1000000 == 10^6
    // console.log(Math.pow(10 , 6))
    if (req.file.size > Math.pow(10, 6)) {
      return res.status(400).json({
        error: "Image should be less than 1mb in size",
      });
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
    // validator joi
    const schema = Joi.object({
      name: Joi.string().required(),
      price: Joi.required(),
      description: Joi.required(),
      quantity: Joi.number().required(),
      category: Joi.required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: error.details[0].message
      });
    }

    await product.save();
    res.status(201).json({
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


exports.productById = (req , res , next , id)=>{
  Product.findById(id).exec((err , product)=>{
    if(err || !product){
      return res.status(404).json({
        error : "product not found !"
      })
    }
    req.product = product;
    next()
  })
}


exports.showProduct = (req ,res)=>{
  req.product.photo = undefined
  res.json({
    product
  })
}