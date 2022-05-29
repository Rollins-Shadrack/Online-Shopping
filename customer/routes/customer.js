const express = require('express')
const {Customer} = require('../model/customer')
const router = express.Router()
const passport = require('passport')
const passportController = require('../controller/passport')
passportController(passport,email => Customer.findOne((user) => user.email === email),id => Customer.findOne((user) => user.id === id))
const {getAddCustomer,addCustomer,getLogin,getAllCustomers,
    getUpdateCustomerView,updateCustomer,getDeleteCustomerView,deleteCustomer} = require('../controller/customer')

router.get('/register',getAddCustomer)

router.post('/register',addCustomer)
router.get('/login',getLogin)
router.post('/login', passport.authenticate('local',{
    successRedirect: 'http://localhost:8002/customerDashboard',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash:true
}))

router.get('/dashboard',(req,res)=>{
    res.render('dashboard',{
        user:req.user
    })
})

router.get('/customers',getAllCustomers)

router.get('/updateCustomer/:id',getUpdateCustomerView)

router.post('/updateCustomer/:id',updateCustomer)

router.get('/deleteCustomer/:id',getDeleteCustomerView)
 router.post('/deleteCustomer/:id',deleteCustomer)
module.exports = router