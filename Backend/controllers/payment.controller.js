const crypto = require('crypto')
const { createRazorpayInstance } = require('../config/razorpay.config')
const { cropModel } = require('../models/db')

const razorpayInstance = createRazorpayInstance()

const createOrder = async (req, res) => {
    const { cropId } = req.body

    const cropDes = await cropModel.findOne({ cropId })

    if (!cropDes) {

    }

    // Create order
    const options = {
        amount: amount * 100, // amount in the smallest currency unit
        currency: 'INR',
        receipt: 'receipt_order_1'
    }


    try {
        razorpayInstance.orders.create(options, (err, order) => {
            if (err) {
                return res.status(200).json({
                    success: false,
                    message: "Something went wrong"
                })
            }

            res.status(200).json(order)
        })
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const verifyPayment = async (req, res) => {
    const { order_id, payment_id, signature } = req.body;

    // Create HMAC object
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

    // Update the HMAC with order_id and payment_id
    hmac.update(order_id + "|" + payment_id);

    // Generate the hash signature
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === signature) {
        return res.status(200).json({
            success: true,
            message: "Payment verified successfully."
        })
    } else {
        return res.status(400).json({
            success: true,
            message: "Payment verification failed!"
        })
    }
}

module.exports = { createOrder, verifyPayment }