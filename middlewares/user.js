const User = require("../models/user");
exports.userById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    req.profile = user;
    // console.log(user)
    next();
  } catch (err) {
    // console.error(err);
    res.status(404).json({ error: err.message });
  }
};

exports.addProductsToUserHistory = async (req, res, next) => {
  let history = [];
  history = req.body.products.map((product) => {
    return {
      _id: product.id,
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      amount: product.quantity * product.price,
      price :  product.price
    };
  });

  if (history.length) {
    const user = await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { history: history } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ error: "Could not update user History !" });
    }
    return next();
  }
  next();
};
