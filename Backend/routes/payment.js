const express = require('express')
const paymentRouter = express.Router()

const { createOrder, verifyPayment } = require('../controllers/payment.controller')

paymentRouter.get("/createOrder", createOrder)
paymentRouter.get("/verifyPayment", verifyPayment)

module.exports = paymentRouter;