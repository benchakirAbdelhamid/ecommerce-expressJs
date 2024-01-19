const express = require('express')
const { create } = require('../controllers/orderController');
const { requireSignIn, isAuth } = require('../middlewares/auth');
const { userById } = require('../middlewares/user');
const router = express.Router()

router.post('/create/:userId' , [requireSignIn,isAuth], create)

router.param("userId", userById);

module.exports =  router
