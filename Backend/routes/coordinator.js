const express = require('express')
const jwt = require('jsonwebtoken')
const  coordinatorRouter  = express.Router()

coordinatorRouter.post('/signin', (req, res) => { }) //email, password based auth
coordinatorRouter.post('/signup', (req, res) => { })
coordinatorRouter.post('/signout', (req, res) => { })


// coordinator add farmers
// access farmer profile and perform the CURD operation

module.exports = {
    coordinatorRouter
}