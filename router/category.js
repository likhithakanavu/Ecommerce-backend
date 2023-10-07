const express = require("express")
const router = express.Router()
const fetchadmin = require('../meduleware/fetchadmin')
const { body, validationResult } = require('express-validator');
const {Insertcategory, Viewcategory, Updatecategory, Deletecategory} = require('../controller/category')


router.post('/Insert', fetchadmin,[body('catname', "Enter a valid category name").isLength({ min: 3 }),], Insertcategory);
router.get('/View', fetchadmin ,Viewcategory)
router.put('/Update/:id',fetchadmin,Updatecategory)
router.delete('/Delete/:id',fetchadmin,Deletecategory)


module.exports = router


