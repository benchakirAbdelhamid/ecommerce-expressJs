const Category = require("../models/category");

exports.allCategories = async (req, res)=>{
    try {
        const category = await Category.find();
        if (!category) {
          return res.status(404).json({ error: "category not found" });
        }
       res.json({category})
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
}

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.json({
      message: "Successfully create category",
      category: category,
    });
  } catch (error) {
    return res.status(400).json({
      error: "bad Request",
    });
  }
};

exports.categoryId = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ error: "category not found" });
    }
    req.category = category;
    next();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.showCategory = async (req, res) => {
  //   let { categoryId } = req.params;
  try {
    let category = req.category;
    res.json({ category });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCategory = async (req, res)=>{
    try {
        let category = req.category
        category.name = req.body.name
        await category.save()
        res.json({
            category,
            message : 'Category updated'
        })
        
    } catch (error) {
        return res.status(400).json({
            error : "bad request !"
        })
    }
}
exports.deleteCategory = async (req, res)=>{
    try {
        let category = req.category
        await category.deleteOne()
        res.status(200).json({
            message : 'Category deleted successfully'
        })
        
    } catch (error) {
        return res.status(404).json({
            error : "category not found !"
        })
    }
}