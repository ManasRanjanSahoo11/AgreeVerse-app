const express = require('express')
const jwt = require('jsonwebtoken')
const adminRouter = express.Router()

const passport = require('passport')
const session = require('express-session')
const GoogleStrategy = require('passport-google-oauth20').Strategy

// create a session
adminRouter.use(session({
    secret: "100xManas",
    resave: false,
    saveUninitialized: true
}))

//initialize the passport ans let it manage authentication in our adminRouter.
adminRouter.use(passport.initialize())
adminRouter.use(passport.session()) //make sure it create express session


adminRouter.post('/signin', (req, res) => { }) // google auth
adminRouter.post('/signup', (req, res) => { })
adminRouter.post('/signout', (req, res) => { })

//remove coordinator
//remove farmer


module.exports = {
    adminRouter
}