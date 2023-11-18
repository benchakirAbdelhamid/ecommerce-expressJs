const express = require("express");
const router = express.Router();

// import controllers
const { salam  , signup , signin , signout } = require("../controllers/authController");
//Import Middleware
const {userSignUpValidator} = require('../middlewares/userValidator')
//autherization
const { requireSignIn } = require("../middlewares/auth");

router.get("/", salam);
// // routes.request.(route , middleware? optionnel , controller)
router.post("/signup",userSignUpValidator ,signup);
// router.post("/signup",signup);

router.post("/signin",signin);

router.get("/signout",signout);

// Apply the requireSignIn middleware
// router.use(requireSignIn);

router.get("/hello", requireSignIn , (req, res) => {
    res.send('hello there');
});

module.exports = router;
