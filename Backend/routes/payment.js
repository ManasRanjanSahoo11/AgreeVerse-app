const express = require('express')
const paymentRouter = express.Router()

const { createOrder, verifyPayment } = require('../controllers/payment.controller')

paymentRouter.post("/createOrder", createOrder)
paymentRouter.post("/verifyPayment", verifyPayment)

module.exports = paymentRouter;