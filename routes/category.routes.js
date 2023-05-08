const express = require('express');
const categoryModel = require('../controller/category.controller')
const router = express.Router();
const upload = require('../uploads/upload.product')
router.post('/',categoryModel.create)
router.get('/',categoryModel.getall)
router.get('/:id',categoryModel.getSingle)
router.put('/:id',categoryModel.updateData)
router.delete('/:id',categoryModel.deleteData)
router.post('/product-image',categoryModel.createImage)
// router.post('/image',categoryModel.createImage)


module.exports = router