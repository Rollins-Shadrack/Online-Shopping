//Cheking authentication
const CheckAuthenticated = (req,res,next) =>{
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/admin/login')
}

const ChecknotAuthenticated = async(req,res,next) =>{
    if(req.isAuthenticated()){
        return res.redirect('/admin/dashboard')
    }
   next()
}

module.exports = {
    ChecknotAuthenticated,
    CheckAuthenticated
}