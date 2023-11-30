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
    // const product = new Product(req.body)
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
        error: error.details[0].message,
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

exports.productById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    // res.json(product)
    req.product = product;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Product not found!" });
  }
};

exports.showProduct = (req, res) => {
  req.product.photo = undefined;
  res.json({
    product: req.product,
  });
};

exports.removeProduct = async (req, res) => {
  try {
    let product = req.product;
    await product.deleteOne();
    return res.status(200).json({
      message: "Product deleted successfully",
      // product
    });
    // // no content
    // return res.status(204).json({});
  } catch (error) {
    return res.status(404).json({
      error: "product not found !",
    });
  }
};

exports.updateProduct = async (req, res)=>{
  // ou use package lodash because update document
  
  try {
  const { productId, userId } = req.params;
  if (req.file.size > Math.pow(10, 6)) {
    return res.status(400).json({
      error: "Image should be less than 1mb in size",
    });
  }
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    photo : {
      data : req.file.buffer,
      contentType : req.file.mimetype
    },
    category: req.body.category
  }

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
        error: error.details[0].message,
      });
    }

  const product = await Product.findByIdAndUpdate(
    productId,
    {$set : updatedProduct}, // ta3tiha object kolo bi updated
    // {$set : req.body}, // aw had tari9a object kolo
    // {new : false} // return data befor updated
    {new : true} // return new data after updated
  )
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ message: 'Product updated successfully', product });
} catch (error) {
  res.status(500).json({ message : 'Error updating product:', error });
}




}
