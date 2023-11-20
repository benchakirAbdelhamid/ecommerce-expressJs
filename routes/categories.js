const express = require('express')
const { createCategory } = require('../controllers/categoryController')
const { userById } = require('../middlewares/user')
const router = express.Router()

const {requireSignIn , isAuth, isAdmin} = require('../middlewares/auth')


router.post('/create/:userId',[ requireSignIn , isAuth , isAdmin ] , createCategory)
router.param('userId',userById)

module.exports = router