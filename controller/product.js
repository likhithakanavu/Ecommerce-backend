const ProductSchema = require('../model/product');
const { body, validationResult } = require('express-validator');

const productInsert = async(req,res)=>{
    console.log(req.body)
    try {
        const { productname,productprice,productdesc,productquatity}= req.body
        
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        const product= new ProductSchema({
            productname,productprice,productdesc,productquatity, admin:req.admin.id
        }) 
        const savedproduct = await product.save()
        res.json(savedproduct) 
    } catch (error) { 
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
}

const ProductView  = async(req,res) =>{

    try {

        const product = await ProductSchema.find({admin: req.admin.id});
        res.json(product)
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
   
}

const ProductDelete = async(req,res) =>{
    try {
        
        let product = await ProductSchema.findById(req.params.id)
        if(!product){res.status(404).send("NOt Found")}

        

        product = await ProductSchema.findByIdAndDelete(req.params.id)
        res.json({"Success":"Product as been deleted",product:product})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
}

const ProductUpdate = async(req,res)=>{
    try {
        const {productname} = req.body
        const {productprice}= req.body
        const {productdesc}=req.body
        const {productquatity}=req.body
        const newproduct = {};

        if(productname) {newproduct.productname=productname};
        if(productprice) {newproduct.productprice=productprice};
        if(productdesc) {newproduct.productdesc=productdesc};
        if(productquatity) {newproduct.productquatity=productquatity};
        let product = await ProductSchema.findById(req.params.id);
        if (!product) { res.status(404).send("Not Found")
        }
        if(product.admin.toString() !== req.admin.id){
            return res.status(401).send("Not Allowed");
        }
        product = await ProductSchema.findByIdAndUpdate(req.params.id,{$set:newproduct},{new:true})
        res.json({product})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
}

module.exports = { productInsert, ProductView, ProductDelete, ProductUpdate } 