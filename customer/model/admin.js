const mongoose = require('mongoose')
const Joi = require('joi')

const adminSchema = new mongoose.Schema({
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
    title:{
        type:String,
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
const Admin = mongoose.model('admin',adminSchema);
const validateCustomer = (admin) =>{
    const schema = Joi.object().keys({
        name:Joi.string().min(5).max(50).required(),
        email:Joi.string().max(50).required(),
        mobile:Joi.string().min(10).max(50).required(),
        title:Joi.string().required(),
        password:Joi.string().required(),


    })
    return schema.validate(admin)
}

module.exports.Admin = Admin;
module.exports.validate = validateCustomer