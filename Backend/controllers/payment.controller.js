const crypto = require('crypto')
const createRazorpayInstance = require('../config/razorpay.config')
const { paymentModel, userPurchasedCropModel, cropModel } = require('../models/db')

const razorpayInstance = createRazorpayInstance()

// only order the payment 
const createOrder = async (req, res) => {

    // => Always fetch price from DB.

    try {
        const { userId, cropId, quantity } = req.body;

        if (!userId || !cropId || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields (userId, cropId, quantity) are required.",
            });
        }

        // Fetch crop price from DB
        const crop = await cropModel.findById(cropId);
        if (!crop) {
            return res.status(404).json({ success: false, message: "Crop not found" });
        }

        const totalAmount = crop.price * quantity;

        console.log(totalAmount);

        // Create order
        const options = {
            amount: totalAmount * 100, // amount in the smallest currency unit
            currency: 'INR',
            receipt: 'receipt_order_' + Date.now()
        }

        const order = await razorpayInstance.orders.create(options)

        // Store payment details in DB (Initial status = 'pending')
        const newPayment = await paymentModel.create({
            userId,
            paymentId: order.id,
            paymentMethod: "",
            amount: totalAmount,
            paymentStatus: "pending",
        })

        res.status(200).json({
            success: true,
            paymentId: newPayment._id,
            order
        });

    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


// make payment
const verifyPayment = async (req, res) => {

    try {
        const { order_id, payment_id, signature, userId, cropId, quantity, deliveryAddress, paymentMethod } = req.body;

        if (!order_id || !payment_id || !signature || !userId || !cropId || !quantity || !deliveryAddress) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for payment verification.",
            });
        }

        // Verify payment signature
        // Create HMAC object
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);

        // Update the HMAC with order_id and payment_id
        hmac.update(order_id + "|" + payment_id);

        // Generate the hash signature
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== signature) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed!",
            });
        }

        // Update payment status in DB
        const payment = await paymentModel.findOneAndUpdate(
            { paymentId: order_id },
            { paymentStatus: "completed" },
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ success: false, message: "Payment record not found!" });
        }

        await userPurchasedCropModel.create({
            user: userId,
            purchasedCrops: [cropId],
            quantity,
            payment: payment._id,
            totalAmount: payment.amount,
            paymentMethod,
            deliveryAddress,
            purchasedAt: Date.now(),
        })

        return res.status(200).json({
            success: true,
            message: "Payment verified and purchase recorded successfully.",
        });

    } catch (error) {
        console.error("Error verifying payment:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { createOrder, verifyPayment }