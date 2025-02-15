const express = require('express')
const bcrypt = require('bcrypt');
const { z } = require('zod')
const userRouter = express.Router()
const { userAuth } = require("../middleware/auth");
const jwt = require('jsonwebtoken');
const { userModel } = require('../models/db');

userRouter.post('/signup', async (req, res) => {

    const userSignupRequiredBody = z.object({
        name: z.string(),
        email: z.string().email(),
        phoneNo: z.string().transform(data => Number(data)),
        password: z.string().min(6, {message: "Password must be at least 6 characters long."})
    })

    const parsedData = userSignupRequiredBody.safeParse(req.body)

    try {
        const { name, email, phoneNo, password } = parsedData.data;

        const exitingUser = await userModel.findOne({ phoneNo, email })

        if (exitingUser) return res.status(409).send("User already exits")

        const hash = await bcrypt.hash(password, 10)

        const newUser = await userModel.create({
            name,
            email,
            phoneNo,
            password: hash
        })

        if (newUser) {
            res.status(201).json({
                success: true,
                message: "New user created successfully"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server crash")
    }

})

userRouter.post('/signin', async (req, res) => {

    const userSigninRequiredBody = z.object({
        identifier: z.string().refine((value) => {
            return /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value);
        }, { message: "Invalid email or phone number format" }),
        password: z.string().min(6)
    });

    const parsedData = userSigninRequiredBody.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({ success: false, message: parsedData.error.errors });
    }

    try {
        const { identifier, password } = parsedData.data;

        // Find user by email or phone
        const user = await userModel.findOne({
            $or: [{ email: identifier }, { phone: identifier }]
        })

        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        // Compare password
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) return res.status(400).json({ success: false, message: "Invalid credentials" });

        //Generate JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_USER_SECRET, { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access (XSS protection)
            secure: true,    // Works only on HTTPS
            sameSite: "lax", 
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        }).status(200).json({
            success: true,
            message: 'User signin successfull with email'
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server crash")
    }
})

userRouter.post('/signout', (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            secure: true,
            sameSite: "lax", // Send the cookie in same-site requests and some cross-site requests
            expires: new Date(0) // Expire the cookie immediately
        })

        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server err" });
    }
})

//preview crops add the platform
userRouter.get('/previewcrop', userAuth, (req, res) => {

})

//all purchases cops by users 
userRouter.post('purchasedcrops', userAuth, (req, res) => {

})

//payment system
userRouter.post('/makepayment', userAuth, (req, res) => {

})

module.exports = {
    userRouter
}