const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcrypt")
const fetchuser = require("../middleware/fecthuser")



router.post("/signup", [
    body("name", "Enter your name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("profassion", "Enter your profassion").isLength({ min: 2 }),
    body("password", "Enter your password more then 5 word").isLength({ min: 5 })
], async(req, res) => {
    try {
        const { name, email, profassion, password } = req.body;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const validemail=  await User.findOne({email})
        if(validemail){
            return res.status(400).json({"message":"This email is alredy have a account.","auth":false})
        }
        const salt = await bcrypt.genSalt(14)
        const hashpassword = await bcrypt.hash(password, salt)
        const user = new User({ name, email, profassion, password: hashpassword });
        await user.save();
        return res.status(200).json({ "message": "Your account is created.", "auth": true })    
    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error." })
    }
});
router.post("/login",[
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter your password more then 5 word").isLength({ min: 5 })
],async(req,res)=>{
    try {
        const {email,password}=req.body;
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }
        const finduser= await User.findOne({email})
        if(!finduser){
            return res.status(404).json({"error":"You don't have any account in this email.","auth":false})
    
        }
        const validpassword= await bcrypt.compare(password,finduser.password)
        if(!validpassword){
            return res.status(400).json({"error":"Your password is not valid.","auth":false})
        }
        const authtoken= jwt.sign({
            user:finduser._id
        },process.env.JWT_SERECT)
        return res.status(200).json({"message":"You are login successfully.","auth":true,"token":authtoken})
    } catch (error) {
        console.log(error)
        return res.status(505).json({ "error": "Internal server error." })
        
    }

});
router.get("/getuser", fetchuser, async (req, res) => {
    try {
        const userid = req.user;
        const user = await User.findById(userid).select("-password")
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ "error": "Internal server error." })
    }
})


module.exports = router;