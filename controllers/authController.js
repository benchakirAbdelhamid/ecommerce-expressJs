// Import model
const User = require("../models/user");
//package generate token
const jwt = require("jsonwebtoken");

exports.salam = async (req, res) => {
  res.send({ message: "salam alaykon waaaa rahmato lah " });
};

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({
      message: "User Successfully Registered",
      user: user,
    });
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    } else {
      return res.status(500).json({ error: err.message });
    }
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;
  // const user = await User.findOne({email})
  // if(user){
  //   return res.json({
  //   user : user
  // })
  // }else {
  //   return res.json({
  //     error : "user not found with this email and password , Please signUp"
  //   })
  // }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(
        "No user found with this email. Please create an account."
      );
    } else {
      // return res.json({
      //   pas : user.authenticate(password)
      // })
      if (user.authenticate(password)) {
        // const { _id, name, email, role, hashed_password, history } = user;
        // return res.json({
        //   user: { _id, name, email, role, hashed_password, history , token : token },
        // });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        res.cookie("token", token, { expire: new Date() + 200000 });
        return res.json({
          token,
          user,
        });
      } else {
        return res.status(401).json({
          error: " password not correct !",
        });
      }
    }
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};



exports.signout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({
      message: "User Signed Out Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
