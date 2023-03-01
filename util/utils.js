const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = async (rawPass) => {
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(rawPass, salt)

    return hashedPassword
}

const comparePassword = async (rawPass, hashedPass) => {
    return bcrypt.compare(rawPass, hashedPass)
}

// pass in the user object from the MongoDB DB to create JWT
const createJwt = (user) => {
    const _id = user._id

    // JWT will expire in Three days for example
    const maxAge = '3d'

    // Payload will contain the user name, user id in sub, and issued at date
    const payload = {
        user: user.username,
        sub: _id,
        iat: Date.now(),
    }

    // sign the new JWT given (payload, secret string, and options)
    const token = jwt.sign(payload, process.env.SECRET_STRING, { expiresIn: maxAge } )

    // return Bearer + token (what the frontend is looking for to store in localStorage)
    return {
        token: "Bearer " + token,
        expires: maxAge,
    }
}

module.exports = {
    hashPassword,
    comparePassword,
    createJwt,
}