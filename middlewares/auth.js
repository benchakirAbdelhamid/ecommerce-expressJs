const { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();

exports.requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  // // all access in admin 
  // if (req.auth.role == 1) {
  //   return next();
  // }else if(req.auth.role == 0){
  //   let user = req.profile && req.auth && req.profile._id == req.auth._id;

  //   if (!user) {
  //     return res.status(403).json({
  //       arror: "Admin Resource , => Access Denied",
  //     });
  //   }
  //   next();
  // }
  // next()

    let user = req.profile && req.auth && req.profile._id == req.auth._id;

    if (!user) {
      return res.status(403).json({
        error: "Access Denied",
      });
    }
    next();
};

exports.isAdmin = (req, res, next) => {
  //is admin all access role = 1
  //   if(req.auth.role == 1){
  //    return next()
  //  }

  if (req.auth.role == 0) {
    return res.status(403).json({
      error: "Admin Resource , Access denied",
    });
  }
  next();
};
