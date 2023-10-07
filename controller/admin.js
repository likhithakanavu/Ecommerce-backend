
const AdminSchema = require('../model/admin')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// npm i bcryptjs
var jwt = require('jsonwebtoken');
const router = require('../router/auth');
// npm i jsonwebtoken
const JWT_SECRET = "hello";




// admin insert 

const InsertAdmin = async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {

        let admin = await AdminSchema.findOne ({ email:req.body.email });
        console.log(admin)

        if(admin){
            return res.status(400).json({success, error:"Sorry a user with this email already exists"})
        }
        const salt =  await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt)

        admin = await  AdminSchema.create({
            name :req.body.name,
            email:req.body.email,
            password:secPass
        })

        const data = {
            admin:{
                id:admin.id
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET)

        success = true

        console.log(success,authtoken);
        res.json({success,authtoken})
    }catch(error){
        console.error(error.message );
        res.status(500).send("Some error occured");
    }
}



// Admin Login

const LoginAdmin = async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json({ errors: errors.array() });
  }
  const {email, password}=req.body;
try {
    let admin = await AdminSchema.findOne({email});
    if (!admin) {
        success=false;
        return res.json({success, error:"Please try to login with correct credentials"})
    }
    const passwordcompare = await bcrypt.compare(password, admin.password);
    if(!passwordcompare){
        success = false;
        return res.json({success, error:"Please try to login with correct credentials"})
    }
    const data  ={
        admin:{
            id:admin.id
        }
    }
    const authtoken  = jwt.sign(data,JWT_SECRET)
    success=true;
    res.json({success,authtoken})
    console.log(authtoken);
 
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error");
    
}
}

// get user

const GetUser = async(req,res)=>{
        try {
            adminId = req.admin.id;
            const admin= await AdminSchema.findById(adminId).select("-password")
            res.send(admin)
            
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server")
            
        }
}

module.exports =  {InsertAdmin,LoginAdmin,GetUser}
