const { truncate } = require("fs");
const User = require("../models/user");

exports.getOneUser = async (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;

  res.json({
    user: req.profile,
  });
};

exports.updateOneUser = async (req, res) => {
    try {
        const  user = await User.findByIdAndUpdate(
          { _id: req.profile._id },
          { $set: req.body },
          { new: true }
        );
        if(!user){
          return res.status(404).json({ error: "user not found" });
        }

        user.hashed_password = undefined;
        user.salt = undefined;

        res.json({  user });
        
    } catch (error) {
        res.status(500).json({ message: "Error updating product:", error });
    }

};
