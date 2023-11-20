const Category = require('../models/category')


exports.createCategory = async(req , res)=>{
    try {
        const category = new Category(req.body)
        await category.save();
        res.json({
            message : "Successfully create category",
            category : category
        })
    } catch (error) {
        return res.status(400).json({
            error : "bad Request"
        })
    }

}