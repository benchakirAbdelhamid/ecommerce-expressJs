const { Order } = require("./../models/order");

exports.create = async (req, res) => {
  try {
    req.body.user = req.profile;
    const order = new Order({
      products: req.body.products,
      total_quatity: req.body.total_quatity,
      amount: req.body.amount,
      user: req.body.user._id,
      date: req.body.date,
      infoPayment_address: req.body.infoPayment.address,
      infoPayment_city: req.body.infoPayment.city,
      infoPayment_full_name: req.body.infoPayment.full_name,
      infoPayment_phone_number: parseInt(req.body.infoPayment.phone_number),
    });
    await order.save();
    res.json({ data: order });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

exports.listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "_id name email")
      .sort("-createdAt"); // decrement
    if (!orders) {
      return res.status(404).json({ error: "order not found" });
    }
    res.json(orders);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.getStatus = (req, res) => {
  res.json({ status: Order.schema.path("status").enumValues });
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
    req.order._id,
      { $set: { status: req.body.status } },
      { new: true }
    );
     if(!order){
         return res.status(404).json({ error: "Order not found" });
     }
    res.json({order});
    // console.log(req.order)
  } catch (error) {
    res.status(500).json({ message: "Error updating order:", error });
  }
};
