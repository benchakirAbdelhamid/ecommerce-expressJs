const express = require('express')
const router = express.Router()
const { userById } = require('../middlewares/user')
const { createProduct } = require('../controllers/productController')

const {requireSignIn , isAuth, isAdmin} = require('../middlewares/auth')


router.post('/create/:userId',[ requireSignIn , isAuth , isAdmin ] , createProduct)
router.param('userId',userById)

module.exports = router