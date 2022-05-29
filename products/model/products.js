const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productimage:{
        type:String,
        required:true
    }
})
const Product = mongoose.model('Products',productSchema)

module.exports.Product = Product;