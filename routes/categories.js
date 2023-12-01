const express = require('express')
const { createCategory,categoryId,allCategories,showCategory,updateCategory,deleteCategory } = require('../controllers/categoryController')
const { userById } = require('../middlewares/user')
const router = express.Router()

const {requireSignIn , isAuth, isAdmin} = require('../middlewares/auth')


router.get('/' , allCategories)
router.get('/:categoryId' , showCategory)
router.post('/create/:userId',[ requireSignIn , isAuth , isAdmin ] , createCategory)
router.put('/:categoryId/:userId',[ requireSignIn , isAuth , isAdmin ] , updateCategory)
router.delete('/:categoryId/:userId',[ requireSignIn , isAuth , isAdmin ] , deleteCategory)


router.param('userId',userById)
router.param('categoryId',categoryId)

module.exports = router