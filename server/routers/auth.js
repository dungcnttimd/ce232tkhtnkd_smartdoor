const express = require('express')
const router= express.Router()
const checkEmail = require("../middleware/verifySignUp")
//const checkAdmin = require("../middleware/checkAdmin")
const auth = require("../middleware/authentication")
const authUserController = require('../controllers/authUserController')

router.post('/register',checkEmail,authUserController.register)
router.post('/login',authUserController.login,auth)
router.post('/logout',authUserController.logout,auth)

// router.post('/logout',(req,res)=>{
//     return res.cookie("token", "", { httpOnly: true,}, { maxAge: "1" })
//    // res.redirect("/login")
// })
// router.post('/refreshToken',checkEmail, authUserController.refreshToken)
module.exports =router
