
const CatSchema = require('../model/category');
const { body, validationResult } = require('express-validator');


const Insertcategory = async (req,res)=>{
    try {
        const  {catname}  = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors:errors.array()});
        }
        const categorys = new CatSchema({
            catname ,admin:req.admin.id
        })
        const savecategory = await categorys.save();
        res.json(savecategory)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured") 
    }
}

const Viewcategory = async(req,res)=>{
    try {
        const categorys = await CatSchema.find({admin:req.admin.id});
        res.json(categorys)
        // console.log(categorys)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
}

const Updatecategory = async(req,res)=>{
    try {
        console.log(req.params.id);
        console.log(req.admin.id);
        const {catname} = req.body;
        const Newcategory = {};
        if (catname) {Newcategory.catname=catname};
        let category =await CatSchema.findById(req.params.id);
        if(!category){ res.status(404).send("Not Found") }
        if(category.admin.toString() !== req.admin.id){
            return res.status(401).send("Not Allowed");
        }
        category = await CatSchema.findByIdAndUpdate(req.params.id, {$set:Newcategory},{new:true})
        res.json({category})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")  
    }
}

const Deletecategory = async(req,res)=>{
    console.log(req.params.id);
    console.log(req.admin.id);
    try {
        let category = await CatSchema.findById(req.params.id);
        if(!category){
            res.status(404).send("Not Found")   
        }
        category= await CatSchema.findByIdAndDelete(req.params.id)
        res.json({"Success":"Category has been deleted", category:category})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured")
    }
}

module.exports = {Insertcategory, Viewcategory, Updatecategory, Deletecategory}