const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const app = express();

//passport
require('./controller/passport')(passport)
require('./controller/adminPassport')(passport)

//templating
//ejs
app.use(expressLayouts);
app.set('view engine','ejs')


//setting up the database
mongoose.connect('mongodb://localhost:27017/OnlineShopping-customers');

//Body-parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Configuring static pages
app.use(express.static('public'))

//Express Sesion
app.use(session({
    secret:'rollins',
    resave:false,
    saveUninitialized:false
}))


//Initializing the passport
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Connect to flash
app.use(flash())

//Global Variables
app.use(function(request, response, next) {
    response.locals.success_alert_message = request.flash('success_alert_message');
    response.locals.error_message = request.flash('error_message');
    response.locals.error = request.flash('error');
    next();
});



//routes
app.use('/',require('./routes/customer'))
app.use('/admin',require('./admin'))

//Logout function
app.delete('/logout', (req,res) =>{
    req.logOut((err)=>{
        console.log(err)
    })
    res.redirect('/admin/login')
})
//server
const PORT = process.env.PORT || 8001;
app.listen(PORT,(()=>{
    console.log(`Customer server started at port ${PORT}`)
}))