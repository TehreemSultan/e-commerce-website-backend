const express = require("express")
const router=express.Router();
const {registerUser,loginUser,viewProfile,verifyjwt} = require("../controllers/user")



router.post(`/register`, registerUser);
router.post(`/login`, loginUser);
router.get("/profile",verifyjwt,viewProfile)
module.exports = router