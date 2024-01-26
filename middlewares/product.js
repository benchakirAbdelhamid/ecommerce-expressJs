const Product = require("../models/product")

exports.decreaseQuantity = (req, res , next)=>{
    let bulkOps = req.body.products.map(product =>{
        return {
            updateOne : {
                filter : {_id : product.id},
                update : {$inc : {quantity : -product.quantity, sold : +product.quantity }}
            }
        }
    })

    const bulkWriteProduct = Product.bulkWrite(bulkOps)
    if(!bulkWriteProduct){
        return res.status(400).json({error : 'Cloud not update Product !'})
    }
    next()
}