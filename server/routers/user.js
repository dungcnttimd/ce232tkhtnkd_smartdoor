const express = require('express')
var myMongoDbObject = {errorr : ''};
const router = express.Router()
const user  = require('../controllers/userController')
const auth = require("../middleware/authentication")
const map = require("../controllers/map")
router.get("/",(req,res)=> res.render("../views/home.ejs"))
router.get("/register",(req,res)=> res.render("../views/register.ejs",{locals: { data : myMongoDbObject }}))
router.get("/login",(req,res)=> res.render("../views/login.ejs"))
router.get("/admin",(req,res)=> res.render("../views/admin.ejs"))
router.get("/basicUser",(req,res)=> res.render("../views/basicUser.ejs"))
//router.get("/map",(req,res)=> res.render("../views/map.ejs"))
router.get("/map",(req,res)=> {
    res.render("../views/maptest.ejs")
    console.log("Go to web ne")
})
router.get("/stream",function (req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.render("../views/stream.ejs")
})
//router.get("/getUser",auth,user.findUserData)
router.get("/getUser",user.findUserData)
router.post("/showID", user.showID)
router.post("/update", user.updateUser)
router.post("/delete", user.deleteUser)
router.post("/add", user.addUser)
router.post('/attendance',user.addStudent)
router.post('/addSensor',user.addSensor)
router.get('/showSensor',user.showSensor)
router.get("/getMap",map.getMap)
router.post("/postMap",map.addMap)
module.exports = router
    