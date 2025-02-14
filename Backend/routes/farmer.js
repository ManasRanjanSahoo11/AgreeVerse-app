const express = require('express')
const twilio = require('twilio')
const dotenv = require('dotenv')
const farmerRouter = express.Router()

dotenv.config()

const { farmerAuth } = require('../middleware/auth')
const { generateAndStoreOTP, verifyOPTAndGenerateJWT } = require('../utils/otp')
const { farmerModel, cropModel, OTPModel } = require('../models/db')

//Initialize twilio
const client = new twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
)

farmerRouter.post('/signup', async (req, res) => {

    try {
        const { phoneNo } = req.body;

        const exitingFarmer = await farmerModel.findOne({ phoneNo })

        if (exitingFarmer) {
            return res.status(409).json({
                success: false,
                message: "Farmer already exits"
            })
        }

        const newFarmer = await farmerModel.create({
            phoneNo
        })

        if (!newFarmer) {
            res.status(201).json({
                success: false,
                message: "Failed to create farmer"
            })
        }

        res.status(201).json({
            success: true,
            message: "New farmer created successfully"
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }

})

farmerRouter.post('/signin', async (req, res) => {
    try {
        const { phoneNo } = req.body;

        const farmer = await farmerModel.findOne({ phoneNo })

        if (!farmer) {
            return res.status(404).json({
                success: false,
                message: "Farmer not found"
            })
        }

        res.status(200).json({
            success: true,
            farmerId: farmer._id,
            nextStep: "send-otp"
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: 'Sign-in process failed'
        });
    }
})

farmerRouter.post('/send-otp', async (req, res) => {
    try {
        const { phoneNo } = req.body;

        if (!phoneNo) {
            return res.status(400).json({ success: false, message: "Phone number is required" });
        }

        const formattedPhoneNo = String(phoneNo).startsWith('+') ? String(phoneNo) : `+91${String(phoneNo)}`;

        const farmer = await farmerModel.findOne({ phoneNo })

        if (!farmer) {
            return res.status(404).send("farmer not found")
        }

        const otp = await generateAndStoreOTP(farmer);
        // console.log(otp);

        // Send via Twilio
        await client.messages.create({
            body: `Your OTP is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: formattedPhoneNo
        })

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            nextStep: "verify-otp"
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.error
        });
    }
})

farmerRouter.post('/verify-otp', async (req, res) => {
    try {
        const { phoneNo, otp } = req.body;

        // verifyOPTAndGenerateJWT
        const { token, farmer } = await verifyOPTAndGenerateJWT(phoneNo, otp)

        // set JWT token
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            success: true,
            message: 'Authentication successful',
            token,
            farmer,
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

farmerRouter.post('/signout', (req, res) => {
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
        res.status(500).json({ success: false, message: "Internal server err" });
    }
})



//add crops add the platform
farmerRouter.post('/add-crop', farmerAuth, async (req, res) => {

    const { title, description, imgURL, price } = req.body

    const newCrop = await cropModel.create({
        title,
        description,
        imgURL,
        price
    })

    if (!newCrop) {
        res.status(401).json({
            success: false,
            message: "Something went wrong crop not added,"
        })
        return
    }

    res.status(200).json({
        success: true,
        message: "Crop added successfully"
    })

})

//update the crop by farmer
farmerRouter.put('/update-crop/:cropId', farmerAuth, async (req, res) => {
    const { cropId } = req.params;

    const updateCrop = await cropModel.findOneAndUpdate({ _id: cropId }, {
        title,
        description,
        imgURL,
        price
    }, {
        new: true
    })

    if (!updateCrop) {
        res.status(404).json({
            success: false,
            message: "Crop not found or not updated."
        })
        return
    }

    res.status(200).json({
        success: true,
        message: "Crop updated successfully"
    })

})

//preview all crops that added by the farmer
farmerRouter.get('/preview-crops', farmerAuth, async (req, res) => {
    const crops = await cropModel.find({})

    if (crops.length === 0) {
        res.status(404).json({
            success: false,
            message: "No crops found."
        })
        return
    }

    res.status(200).json({
        success: true,
        crops: crops
    })
})

//delete the crop
farmerRouter.delete('/delete-crop/:cropId', farmerAuth, async (req, res) => {
    const { cropId } = req.params;

    const deleteCrop = await cropModel.findOneAndDelete({ _id: cropId })

    if (!deleteCrop) {
        res.status(404).json({
            success: false,
            message: "Crop not found or not deleted."
        })
        return
    }

    res.status(200).json({
        success: true,
        message: "Crop deleted successfully"
    })

})

module.exports = {
    farmerRouter
}