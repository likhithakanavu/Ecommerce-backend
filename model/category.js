const mongoose = require('mongoose');
const {Schema} = mongoose

const CatSchema = new Schema({
    catname :{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})

const category = mongoose.model("category", CatSchema)
module.exports = category