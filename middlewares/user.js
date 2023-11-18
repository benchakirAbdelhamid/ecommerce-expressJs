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
