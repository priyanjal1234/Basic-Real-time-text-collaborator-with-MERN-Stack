const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controllers/userController')
const { isLoggedin } = require('../middlewares/isLoggedin')

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/logout",logoutUser)

router.get("/profile",isLoggedin,getUserProfile)

module.exports = router