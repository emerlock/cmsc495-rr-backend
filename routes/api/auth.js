const express = require('express')
const passport = require('passport')
const authController = require('../../controllers/authController')
const router = express.Router()

// Test route for backend authentication with passportjwt
router.route('/test')
    .get(passport.authenticate('jwt', { session: false }), (req, res) => {
        res.status(200).send("You are authenticated")
    })

router.route('/login')
    .post(authController.loginUser)

router.route('/register')
    .post(authController.registerUser)

module.exports = router