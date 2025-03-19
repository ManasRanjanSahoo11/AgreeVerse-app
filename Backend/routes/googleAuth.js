const express = require('express');
const passport = require('../strategy/google');
const googleAuthRouter = express.Router();

// Google OAuth Login
googleAuthRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback
googleAuthRouter.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin' }),
    (req, res) => {

        // Setting up JWT 
        const { user, token } = req.user // Extract user and token

        if (token) {
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            })
        }

        // Redirect user based on role
        const role = req.user.constructor.modelName.toLowerCase();

        // Ensure the role is correctly set in session
        req.session.role = role;

        // Client URL(Frontend => React)
        const CLIENT_URL = "http://localhost:5173"

        if (role === 'admin') return res.json({
            success: true,
            message: "Signup Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: role
            },
            redirectURL: `${CLIENT_URL}/${role}/dashboard`
        });

        if (role === 'coordinator') return res.json({
            success: true,
            message: "Signup Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: role
            },
            redirectURL: `${CLIENT_URL}/${role}/dashboard`
        });

        if (role === 'farmer') return res.json({
            success: true,
            message: "Signup Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: role
            },
            redirectURL: `${CLIENT_URL}/${role}/dashboard`
        });

        if (role === 'user') return res.json({
            success: true,
            message: "Signup Successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: role
            },
            redirectURL: `${CLIENT_URL}/${role}/home`
        });
    }
);

// Logout Route
googleAuthRouter.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = googleAuthRouter;