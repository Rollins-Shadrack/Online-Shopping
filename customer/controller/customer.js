const {Customer, validate} = require('../model/customer')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const passportController = require('./passport')
const { Joi } = require('joi')
passportController(passport,email => Customer.findOne((user) => user.email === email),id => Customer.findOne((user) => user.id === id))
const getAddCustomer = async(req,res,next) =>{
    res.render('register')
}
const addCustomer = async(req,res,next) =>{
    let errors = []
    let email = req.body.email
    Customer.findOne({email:email}).then(
        user=>{
            if(!user){
                const {error} = validate(req.body)
                if(error) return res.status(422).send(error.details[0].message)
                const hashedPassword =  bcrypt.hashSync(req.body.password,10)
                let customer = new Customer({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    password: hashedPassword,
                    image:'default3.jpg'
                })
                customer =  customer.save()
                res.redirect('/login')
            }
            errors.push({msg:'Customer Already Registered'})
            res.render('register',{
                errors
            })
            
        }
    )
}
const getLogin = async(req,res,next)=>{
    const err = req.flash().error || [];
    res.render("login",{
        err
    })
}
const getDashboard = async(req,res,next)=>{
    res.render('dashboard',{
        user:req.customer
    })
}
const getAllCustomers = async(req,res,next)=>{
    const list = await Customer.find().exec();
    res.render('customerlist',{
        customers:list
    })
}
const getUpdateCustomerView = async(req,res,next) =>{
    try{
            const id = req.params.id;
            const oneCustomer = await Customer.findById(id).exec();
            res.render('updateCustomer',{
                customer:oneCustomer
            })
    }catch(err){
        res.status(400).send(err.message);
    }
}
const updateCustomer = async(req,res,next) =>{
    const id = req.params.id;
    const data = req.body
    let customer = await Customer.findByIdAndUpdate(id,{
        name: data.name,
        email: data.email,
        mobile: data.mobile,
    },{new: true});
    if(!customer) return res.status(404).send("Customer with the given id is not found")

    res.redirect('/customers')
}

const getDeleteCustomerView = async(req,res,next) =>{
    try{
        const id = req.params.id;
        const oneCustomer = await Customer.findById(id).exec();
        res.render('deleteCustomer',{
            customer:oneCustomer
        })
}catch(err){
    res.status(400).send(err.message);
}
}
const deleteCustomer = async(req,res,next) =>{
    try{
        const id = req.params.id
        const customer = await Customer.findByIdAndRemove(id);
        if(!customer) return res.status(404).send("Customer with the given id is not found")
        res.redirect('/customers')
    
    }catch(err){
        res.status(400).send(err.message);
    
    }
}
module.exports = {
    getAddCustomer,
    addCustomer,
    getLogin,
    getDashboard,
    getAllCustomers,
    getUpdateCustomerView,
    updateCustomer,
    getDeleteCustomerView,
    deleteCustomer
}