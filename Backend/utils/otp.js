const twilio = require('twilio')
const crypto = require('crypto')
const jwt = require("jsonwebtoken")

const { OTPModel, farmerModel } = require('../models/db')


async function generateAndStoreOTP(farmer) {
    const otp = crypto.randomInt(100000, 999999).toString();

    //Hash the opt before store
    const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

    await OTPModel.create({
        farmer: farmer._id,
        otp: hashedOTP,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
    })

    return otp;
}

async function verifyOPTAndGenerateJWT(phoneNo, otp) {
    const farmer = farmerModel({ phoneNo })

    if (!farmer) {
        return res.status(404).send("Farmer not found")
    }

    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex')

    const validateOtp = await OTPModel.findOne({
        farmer: farmer._id,
        otp: hashedOtp,
        expiresAt: { $gt: Date.now() }
    })

    if (!validateOtp) return res.send('Invalid or expired OTP');

    //generate token
    const token = jwt.sign({
        farmerId: farmer._id
    }, process.env.JWT_SECRET)

    //cleaningup otp
    await OTPModel.deleteOne({ _id: validateOtp._id })

    return {token, farmer}
}

module.exports = {
    generateAndStoreOTP,
    verifyOPTAndGenerateJWT
}