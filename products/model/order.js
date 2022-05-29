const mongoose = require('mongoose')
const Joi = require('joi');
const { string } = require('joi');

const orderSchema = new mongoose.Schema({
    productimage:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    county:{
        type:String,
        required:true
    },
    estate:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    payment:{
        type:String,
        required:true
    },
    mpesaNumber:{
        type:Number
    },
    amount:{
        type:String,
        required:true
    },
    mastercardName:{
        type:String
    },
    mastercardNumber:{
        type:Number
    }
})
const Order = mongoose.model('Order',orderSchema);
module.exports.Order = Order;
