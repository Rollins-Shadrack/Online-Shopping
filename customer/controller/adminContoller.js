const {Admin,validate} = require('../model/admin')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const passportController = require('./adminPassport')
const { Joi } = require('joi')
passportController(passport,email => Admin.findOne((user) => user.email === email),id => Admin.findOne((user) => user.id === id))
const addAdmin = async(req,res,next) =>{
    let errors = []
    let success = []
    let email = req.body.email
    Admin.findOne({email:email}).then(
        user=>{
            if(!user){
                const {error} = validate(req.body)
                if(error) return res.status(422).send(error.details[0].message)
                const hashedPassword =  bcrypt.hashSync(req.body.password,10)
                let admin = new Admin({
                    name: req.body.name,
                    email: req.body.email,
                    mobile: req.body.mobile,
                    title:req.body.title,
                    password: hashedPassword,
                    image:'default3.jpg'
                })
                admin =  admin.save()
                success.push({msg:'Admin Added Successfully'})
                res.render('newAdmin',{success})
            }
            errors.push({msg:'Admin Already Added!!'})
            res.render('newAdmin',{
                errors
            })
            
        }
    )
}
const getadminLoginView = async(req,res,next) =>{
    res.render('adminlogin')
}

const getNewAdmin = async(req,res,next) =>{
    res.render('newAdmin')
}
const getAdminDashboard = async(req,res,next) =>{
    res.render('adminDashboard',{
        admin:req.admin
    })
}
module.exports = {
    getadminLoginView,
    getNewAdmin,
    addAdmin,
    getAdminDashboard
}