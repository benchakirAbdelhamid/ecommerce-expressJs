const express = require('express')
const { getOneUser } = require('../controllers/userController')
const {userById} = require('../middlewares/user')
const {requireSignIn , isAuth} = require('../middlewares/auth')
const router = express.Router()

router.get('/profile/:userId' ,requireSignIn,isAuth, getOneUser)
router.param('userId',userById )

module.exports = router