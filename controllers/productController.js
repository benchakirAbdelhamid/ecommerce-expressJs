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

exports.updateProduct = async (req, res) => {
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
      photo: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      category: req.body.category,
    };

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
      { $set: updatedProduct }, // ta3tiha object kolo bi updated
      // {$set : req.body}, // aw had tari9a object kolo
      // {new : false} // return data befor updated
      { new: true } // return new data after updated
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Error updating product:", error });
  }
};

exports.allProducts = async (req, res) => {
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? req.query.limit : 100;
    // res.json({
    //   sortBy , order , x :parseInt(limit) , query :req.query
    // })

    const products = await Product.find()
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(parseInt(limit));

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({ products, lengthProducts: products.length });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products:", error });
  }
};

exports.relatedProducts = async (req, res) => {
  try {
    // test value req.product
    const  producttest=req.product
    let limit = req.query.limit ? req.query.limit : 6;

    const products = await Product.find({
      category: req.product.category,
      _id: { $ne: req.product._id },
    })
    .select("-photo")
      .limit(parseInt(limit))
      .populate("category", "_id name");
  
      if (products.length === 0) {
        return res.status(404).json({ message: "No products found" });
      }
  
      res.json({ products, lengthProducts: products.length ,producttest });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products:", error });
  }

};

exports.searchProduct = async (req , res)=>{
  try {
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    let order = req.query.order ? req.query.order : "asc";
    let limit = req.query.limit ? req.query.limit : 100;
    let skip = parseInt(req.body.skip)
    let findArgs = {};

    for(let key in req.body.filters){
      if(req.body.filters[key].length>0){
        if(key === 'price'){
          findArgs[key] = {
            $gte : req.body.filters[key][0],
            $lte : req.body.filters[key][1],
          }
        }else{
          findArgs[key] = req.body.filters[key]
        }
      }
    }

    const products = await Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .limit(parseInt(limit))
      .skip(skip)

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.json({ products, lengthProducts: products.length  , skip :req.body.skip});

  } catch (error) {
    res.status(500).json({ message: "Error fetching products:", error });
  }
}

exports.photoProduct = async(req, res)=>{
  // ==>get photo
  // http://localhost:8004/api/product/photo/656b041fcb9991fe85358cf9
  // http://localhost:8004/api/product/photo/:idproduct
  const {data , contentType} = req.product.photo
  if(data){
    res.set('Content-Type',contentType)
    return res.send(data)
  }
}