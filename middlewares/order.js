const {Order} = require("../models/order");

exports.orderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id) ;
    // const order = await Order.find({_id : id})
    if (!order) {
      throw new Error("Order not found !");
    }
    req.order = order;
    // console.log(order)
    next();
  } catch (err) {
    // console.error(err);
    res.status(404).json({ error: err.message });
  }
};
