const express = require('express')
const app = express();
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const expressLayouts = require('express-ejs-layouts')

//setting up view Engine
app.use(expressLayouts);
app.set('view engine','ejs')

//setting up the database
mongoose.connect('mongodb://localhost:27017/OnlineShopping-products');

//Body-parser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Configuring static pages
app.use(express.static('public'))

app.use(methodOverride('_method'))

//routes
app.use('/',require('./Routes/product'))


//Logout function
app.delete('/logout', (req,res) =>{
    req.logOut((err)=>{
        console.log(err)
    })
    res.redirect('/')
})

//server
const PORT = process.env.PORT || 8002;
app.listen(PORT,(()=>{
    console.log(`Products server started at port ${PORT}`)
}))