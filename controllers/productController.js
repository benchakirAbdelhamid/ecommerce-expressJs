const Product = require("../models/product");
const fs = require("fs");
const formidable = require("formidable");

exports.createProduct = async (req, res) => {
  // verifie upload samarch
  let form = new formidable.IncomingForm();
  form.keepExtentions = true;

  await form.parse(req, async (err, fields, files) => {

    if (err) {
      return res.status(400).json({
         error: err.message 
      });
    }

    let product = new Product(fields);
    if (fields.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    try {
        await product.save(); // Await the Promise returned by save()
        res.json({
          message: 'Product created successfully',
          product: product,
        }); 
      } catch (err) {
        console.error(err);
        res.status(400).json({
          error: err.message
        });
      }

    // photo.save((err, product) => {
    // product.save((err, product) => {
    //   if (err) {
    //     return res.status(400).json({
    //       err: "Prosuct not persist",
    //     });
    //   }

    //   res.json({
    //     product: product,
    //   });

    // }
    // );
  });
};


// exports.createProduct = async (req, res) =>{
//   return res.json({
//     message : "hello"
//   })
// }