
const jwt  = require('jsonwebtoken')


module.exports= function (req,res,next) {
   const token=req.header('xx-auth-token')
   if (!token) {
       return res.status(401).send('unthaurized x')
   }
   
   try {
       const decodeToken=jwt.verify(token,'privateKey2')
    
           req.user=decodeToken
           // console.log(req.user)
         
           next()  
   
   } catch (error) {
       return res.status(401).send('invalid token ')
   }
   
}
