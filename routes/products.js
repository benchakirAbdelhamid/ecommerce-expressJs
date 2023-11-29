const express = require("express");
const { userById } = require("../middlewares/user");
const { createProduct, productById, showProduct } = require("../controllers/productController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = express.Router();


router.get('/:productId' , showProduct)

// router.post('/create' ,upload.single('photo'), createProduct)
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  upload.single("photo"),
  createProduct
);


router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
