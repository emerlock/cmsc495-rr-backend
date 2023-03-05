const express = require('express')
const passport = require('passport')
const userController = require('../../controllers/userController')
const router = express.Router()

router.use(passport.authenticate("jwt", {session: false}))


router.route('/')
    .get(userController.userId)

module.exports = router