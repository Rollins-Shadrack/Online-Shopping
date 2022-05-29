const mongoose = require('mongoose')
const Joi = require('joi')

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        maxlength:50,
        required:true
    },
    email:{
        type:String,
        maxlength:50,
        required:true
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:50,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    }
})
const Customer = mongoose.model('Customer',customerSchema);
const validateCustomer = (customer) =>{
    const schema = Joi.object().keys({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().max(50).required(),
        mobile:Joi.string().min(10).max(50).required(),
        password:Joi.string().required(),


    })
    return schema.validate(customer)
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer