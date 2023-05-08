const express = require('express');
const User = require('../controller/user.controller')
const verifyToken = require('../middleware/index')
const router = express.Router();

router.post('/',User.create)
router.post('/login', User.login)
router.get('/',User.getall)
// router.get('/:id',categoryModel.getSingle)
// router.put('/:id',categoryModel.updateData)
// router.delete('/:id',categoryModel.deleteData)


module.exports = router