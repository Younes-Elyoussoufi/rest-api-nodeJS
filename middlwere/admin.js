

 module.exports= function (req,res,next) {
    console.log("admin : "+req.user.isAdmin)
    if (!req.user.isAdmin) {
        

        return res.status(403).send('you are note admin user!!')
    }
   next()  
    
 }
