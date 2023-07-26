const express = require("express");
const router = express.Router();
const {User,validateAuth,validateUser}  = require('../models/User')
const _=require('lodash')
const bcrypt=require('bcrypt')

//REGISTER
router.post("/register", async (req, res) => {
  const {error} =await validateUser(req.body)
  if (error) {
   return res.send(error.details[0].message)
  }
  let user=await User.findOne({email:req.body.email})
  if (user) {
      return res.status(404).send('the email is already registred!!')
     }

  try {
    user= new User(_.pick(req.body,['username','email','password']))
    const salRount=10;
    const salt=await bcrypt.genSalt(salRount);
    user.password=await bcrypt.hash(user.password,salt)
    await user.save()
    const token= user.generateToken()
    res.header('xx-auth-token',token).send(_.pick(req.body,['_id','username','email']))
  } catch (error) {
    return res.send('the username is already registred!!')
  }  
})

//LOGIN

router.post('/login', async (req, res) => {
  console.log(req.body)
  try {
    const {error} =await validateAuth(req.body)
    if (error) {
     return res.send(error.details[0].message)
    }
    let user=await User.findOne({email:req.body.email})
    if (!user) {
        return res.status(404).send('email or password is not valid!!')
       }
  
   const checkUser=await bcrypt.compare(req.body.password,user.password)
   if (!checkUser) {
    return res.status(404).send('email or password is not valid!!')
   }
   const token= user.generateToken()
    console.log('loged   '+token)
   res.header('xx-auth-token',token).send(_.pick(user,['_id','username','email']))
  //    res.send(user=jwt.verify(token,'privateKey'))
  } catch (error) {
    return res.send(error.message)
  }

})


//LOGout

router.post('/logout', async (req, res) => {

   res.header('xx-auth-token','').send('logout')
  //    res.send(user=jwt.verify(token,'privateKey'))
 })
module.exports = router;
