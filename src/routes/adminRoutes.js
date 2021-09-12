const express = require("express")
const router=express.Router();
const {registerAdmin,loginAdmin,gettingTempUser,acceptingUser,rejectingUser} = require("../controllers/admin")



router.post(`/register`, registerAdmin);
router.post(`/login`, loginAdmin);
router.get(`/gettingTempUser`, gettingTempUser);
router.post(`/acceptingUser`, acceptingUser);
router.post(`/rejectingUser`, rejectingUser);


module.exports = router