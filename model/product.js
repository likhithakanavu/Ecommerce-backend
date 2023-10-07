const mongoose = require('mongoose')
const {Schema} = mongoose

const ProductSchema = new Schema({

    category_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category"
    },

    productname:{
        type:String,
        require:true
    },
    productprice:{
        type:Number,
        require:true,
    },
    productdesc:{
        type:String,
        require:true,
    },
    productimg:{
        type:String,
       
    },
    productquatity:{
        type:String,
        require:true,
    }
    

})

const product = mongoose.model("product", ProductSchema)
module.exports = product