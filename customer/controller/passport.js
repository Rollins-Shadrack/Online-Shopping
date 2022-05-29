const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const {Customer} = require('../model/customer')


function initialize(passport){
    passport.use(new LocalStrategy({
        usernameField:'email',
        passwordField:'password',
        passReqToCallback:true
    }, 
    function authenticateUser(req,email,password,done) {
        let errors = []
        
            //match user
            Customer.findOne({email:email})
            .then(
                user=>{
                    if(!user){
                        return done(null,false,req.flash('error_message','Customer Not Registered'))
                    }
                    bcrypt.compare(password,user.password, (err,isMatch) =>{
                        if(err) {console.log(err)}
                        if(isMatch){
                            return done(null, user)
                        }else{
                            return done(null,false,req.flash('error_message','Incorrect Password'))
                        }
                    })
                }
            ).catch((err)=>{
                console.log(err.message)
            })

    }))
   

    //used to serialize the user
    passport.serializeUser((user,done) =>{
        done(null,user.id)
    
    })
    //used to deserialize the user
    passport.deserializeUser((id,done)=>{
        Customer.findById(id,(err,user)=>{
            done(err,user)
        })
    })

}
module.exports = initialize;



