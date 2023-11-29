const express = require('express')
const router = express.Router()
const { userById } = require('../middlewares/user')
const { createProduct } = require('../controllers/productController')

const {requireSignIn , isAuth, isAdmin} = require('../middlewares/auth')

const upload = require('../middlewares/multer')



// router.post('/create' ,upload.single('photo'), createProduct)
router.post('/create/:userId',[ requireSignIn , isAuth , isAdmin ],upload.single('photo'), createProduct)
router.param('userId',userById)

module.exports = router