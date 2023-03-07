const User = require('../models/userModel')
const { hashPassword, comparePassword, createJwtPromise} = require('../util/utils')

const loginUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) return res.status(400).json({ msg: "username, or password not supplied" })

    try {
        // look for unique user in db with username
        const user = await User.findOne({ username })

        if (!user) return res.status(401).json({msg: "User not found"})
        
        // look compare supplied password to user's hashed password
        const isValid = await comparePassword(password, user.password)

        // if valid issue a jwt for the user
        if (isValid) {
            const jwt = await createJwtPromise(user)
            res.status(200).json({ success: true, currentUser: { userId: user._id, username: user.username }, tokens: jwt.token, expiresIn: jwt.expires, msg: "User has been logged in" })
        } else {
            res.status(400).json({msg: "Credentials not valid"})
        }
    } catch (err) {
        console.log(err.message)
    }
}

const registerUser = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password ) return res.status(400).json({ msg: "Username, or password not supplied" })

    try {
        const userExists = await User.findOne({ username })

        if (userExists) return res.status(400).json({ msg: "Username has been taken "})

        const hashedPassword = await hashPassword(password)

        const user = await User.create({
            username, 
            password: hashedPassword,
        })
        const jwt = await createJwtPromise(user)
        res.status(201).json({ success: true, tokens: jwt.token, expiresIn: jwt.expires, msg: "User has been created!" })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    registerUser,
    loginUser
}