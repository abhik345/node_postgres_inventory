const express = require("express");

const {login, register,resetPassword,forgetPassword,loginWithCookie} = require("../../controllers/auth/authController")


const router = express.Router();


router.post("/login",login);
router.post("/register",register);
router.post("/reset-password",resetPassword);
router.post("/forget-password",forgetPassword);
router.post("/login-with-cookie",loginWithCookie);


module.exports = router;