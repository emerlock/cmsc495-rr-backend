/* ||  Imports */
require('dotenv').config()
require('./config/passport');
const recipeRouter = require('./routes/api/recipes')
const authRouter = require('./routes/api/auth')
const userRouter = require('./routes/api/user')
const cors = require('cors')
const passport = require('passport')

/* ||  Creating an Express App stored in app */
const express = require('express')
const app = express()

// Defined a PORT for our app http://localhost:4000, or use a port in .env file
const PORT = process.env.PORT || 4000

/* ||  Example Custom Middleware Logger */
app.use((req, res, next) => {
    // will log the route, HTTP verb, and who made the request ex) www.google.com
    console.log(req.url, req.method, req.headers.origin) // log on serverside
    // call next() in custom middleware or the app will stop working
    next()
})


/* ||  Applying Regular Middleware */
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Allows React app to make HTTP requests to Backend
app.use(cors())

/* || Applying Authentication Middleware */
app.use(passport.initialize())

/* ||  Applying General Rules for CORS without corsConfig file */
app.options('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT')
    res.send(200)  
})


/* ||  Applying Api routes */
app.use('/api/auth', authRouter)
app.use('/api/recipes', recipeRouter)
app.use('/api/user', userRouter)


/* ||  Catch all for now */
app.all('*', (req, res) => {
    res.status(400).send('Error Occured')
})


/* ||  Listen to Requests on our Port */
app.listen(PORT, () => console.log(`Listening to our app on port ${PORT}`))