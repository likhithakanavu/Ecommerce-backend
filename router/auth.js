const express = require("express");
const router = express.Router()
const { body, validationResult } = require('express-validator');
const {InsertAdmin,LoginAdmin,GetUser } = require("../controller/admin");
var fetchadmin = require('../meduleware/fetchadmin')


// admin register

router.post('/insert',[

    body('name', "Enter a valid name").isLength({min:3}),
    body('email', "Enter a valid email").isLength(),
    body('password', "Enter a valid password").isLength({min:5}),

], InsertAdmin)

router.post('/login', [

    body('email', "Enter a valid Email").isEmail(),
    body('password', "Enter a valid Password").exists(),
  
  ], LoginAdmin)

  router.post('/getadmin',fetchadmin ,GetUser)






module.exports= router