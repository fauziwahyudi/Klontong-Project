const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController')
const { authorizationCategory } = require('../middleware/authorization')


router.get('/', CategoryController.readAllCategories)
router.post('/', CategoryController.addCategory)
router.put('/:id', authorizationCategory, CategoryController.editCategory)
router.delete('/:id', authorizationCategory, CategoryController.deleteCategory)

module.exports = router