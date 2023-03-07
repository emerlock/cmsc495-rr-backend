const User = require('../models/userModel')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_STRING,
}

const verify = async (payload, done) => {

    const user = await User.findById({ _id: payload.sub }).catch(err => done(err, false))

    if (user) {
        return done(null, user)
    } else {
        return done(null, false)
    }
}

// instantiate the strategy to use with passport
const strategy = new JwtStrategy(options, verify)

// Register a strategy for later use when authenticating requests.
passport.use(strategy)
