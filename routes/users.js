const express = require('express')
const { getOneUser,updateOneUser } = require('../controllers/userController')
const {userById} = require('../middlewares/user')
const {requireSignIn , isAuth, isAdmin} = require('../middlewares/auth')
const router = express.Router()

// ==> get user by id
router.get('/profile/:userId' ,requireSignIn,  isAuth ,isAdmin, getOneUser)
// router.get('/profile/:userId' ,requireSignIn,isAuth, getOneUser)

router.put('/profile/:userId' ,requireSignIn,  isAuth ,isAdmin, updateOneUser)

router.param('userId',userById )

module.exports = router