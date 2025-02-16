const express = require('express')
const passport = require('../strategy/google')
const router = express.Router

// Google OAuth Login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Google OAuth Callback
router.get('google/calback',
    passport.authenticate('google', {
        successRedirect: "/dashboard",//fit it
        failureRedirect: "/login"
    })
)

router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
})

module.exports = router