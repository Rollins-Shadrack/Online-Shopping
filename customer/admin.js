const express = require('express')
const router = express.Router()
const passport = require('passport')
const {Admin} = require('./model/admin')
const passportController = require('./controller/passport')
passportController(passport,email => Admin.findOne((user) => user.email === email),id => Admin.findOne((user) => user.id === id))
const {getadminLoginView,getNewAdmin, addAdmin,getAdminDashboard} = require('./controller/adminContoller')
const {Customer} = require('./model/customer')


router.get('/login',getadminLoginView)

router.post('/login',passport.authenticate('local',{
    successRedirect:'/admin/dashboard',
    failureRedirect:'/admin/login',
    failureFlash: true,
    successFlash:true
}))

router.get('/newAdmin',getNewAdmin)

router.post('/newAdmin',addAdmin)

router.get('/dashboard',async(req,res,next) =>{
    const numberOfCustomers = await Customer.count()
    const numberOfAdmin = await Admin.count()
    const lastCustomers = await Customer.find().sort({_id:-1}).limit(3).exec()
    console.log(lastCustomers)
    console.log(numberOfCustomers)

    res.render('adminDashboard',{
        user:req.user,
        lastCustomers: lastCustomers,
        numberOfCustomers:numberOfCustomers,
        numberOfAdmin:numberOfAdmin
    })
})

module.exports = router