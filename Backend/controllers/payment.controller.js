const crypto = require('crypto')
const createRazorpayInstance = require('../config/razorpay.config')

const razorpayInstance = createRazorpayInstance()

// only order the payment 
const createOrder = async (req, res) => {

    /*
    => Always fetch price from DB.
    
    const { productId } = req.body

    const product = await cropModel.findOne({ productId })

    if (!product) {
        res.status(401).json({
            success:false,
            message:"Crop not found"
        })
    }

    const amount = product.price;
    */

    const { price } = req.body;

    if (!price) {
        return res.status(400).json({
            success: false,
            message: "Price is required"
        });
    }

    console.log(price);

    // Create order
    const options = {
        amount: price * 100, // amount in the smallest currency unit
        currency: 'INR',
        receipt: 'receipt_order_' + Date.now()
    }

    const order = await razorpayInstance.orders.create(options)

    res.status(200).json({
        success: true,
        order,
    });
}

// make payment
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