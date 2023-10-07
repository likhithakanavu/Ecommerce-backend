const express = require("express")
const router = express.Router()
const fetchadmin = require('../meduleware/fetchadmin')
const { body, validationResult } = require('express-validator');
const { productInsert, ProductView,ProductDelete, ProductUpdate } = require('../controller/product');

router.post('/Insert', fetchadmin, [body('productname','Enter a valid product name').isLength({ min: 3 }),
body('productprice','Enter a valid product price').isLength({ min:1 }),
body('productdesc','Enter a valid product description').isLength({ min:10 }),
body('productquatity','Enter a valid product quatity').isLength({ min:1 }),
], productInsert )

router.get('/View', fetchadmin, ProductView)
router.delete('/Delete/:id',fetchadmin,ProductDelete)
router.put('/Update/:id', fetchadmin, ProductUpdate)

module.exports = router
