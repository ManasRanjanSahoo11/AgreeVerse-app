const express = require('express')
const userRouter = express.Router()
const {userAuth} = require("../middleware/auth")

userRouter.post('/signup', async (req, res) => {

    try {
        const { firstName, lastName, email, phoneNo } = req.body;

        const exitingUser = await userModel.findOne({ phoneNo })

        if (exitingUser) return res.status(409).send("User already exits")

        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            phoneNo
        })

        if (newUser) {
            res.status(201).json({
                success: true,
                message: "New user created successfully"
            })
        }
    } catch (err) {
        console.log(err);
        res.send("Internal server crash")
    }

})

userRouter.post('/signin', async (req, res) => {
    try {
        const { phoneNo } = req.body;

        const user = await userModel.findOne({ phoneNo })

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({
            success: true,
            user: user._id,
            nextStep: "send-otp"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Sign-in process failed' });
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

//payment system
userRouter.post('/makepayment',userAuth, (req, res)=>{

})

//all purchases cops by users 
userRouter.post('purchasedcrops',userAuth, (req, res)=>{
    
})

module.exports = {
    userRouter
}