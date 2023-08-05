const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/productController');
const { authorizationProduct } = require('../middleware/authorization');
const upload = require('../middleware/upload'); 
const imageUpload = require('../middleware/imageUpload'); 

router.get('/', ProductController.readProduct);
router.post('/', upload.single('image'), imageUpload, ProductController.addProduct);
router.put('/:id', authorizationProduct, upload.single('image'), imageUpload, ProductController.editProduct);
router.delete('/:id', authorizationProduct, ProductController.deleteProductById);
router.get('/:id', ProductController.readProductById);

module.exports = router;
