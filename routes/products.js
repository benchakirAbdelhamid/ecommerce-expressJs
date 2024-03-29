const express = require("express");
const { userById } = require("../middlewares/user");
const {
  allProducts,
  createProduct,
  productById,
  showProduct,
  removeProduct,
  updateProduct,
  relatedProducts,
  searchProduct,
  photoProduct
} = require("../controllers/productController");
const { requireSignIn, isAuth, isAdmin } = require("../middlewares/auth");
const upload = require("../middlewares/multer");

const router = express.Router();

// => Get all products
router.get('/' , allProducts)

// => Get a product
router.get("/:productId", showProduct);

// => Get related
router.get('/related/:productId' , relatedProducts)

// search product
router.post('/search',searchProduct)

// photo
router.get('/photo/:productId',photoProduct)

// => Create a product
router.post(
  "/create/:userId",
  [requireSignIn, isAuth, isAdmin],
  upload.single("photo"),
  createProduct
);

// => Delete a product
router.delete(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  removeProduct
);

// => Update a product
router.put(
  "/:productId/:userId",
  [requireSignIn, isAuth, isAdmin],
  upload.single("photo"),
  updateProduct
);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
