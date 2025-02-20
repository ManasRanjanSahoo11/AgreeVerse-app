const jwt = require('jsonwebtoken')
const { userModel } = require('../models/db')

function userAuth(req, res, next) {
    try {
        const token = req.header("token")

        if (!token) {
            throw new Error('Authentication required');
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET)

        const user = userModel.findOne({
            _id: decodedData._id
        })

        if (!user) {
            return res.status(404).send("User not found")
        }

        // Attach user to request
        req.user = user;
        next()
    } catch (err) {
        res.status(401).json({
            error: 'Authentication failed',
            details: err.message
        });
    }
}

function adminAuth(req, res, next) {

}

function coodinatorAuth(req, res, next) {

}

function farmerAuth(req, res, next) {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).send("unauthorized")
        }

        const decodedData = jwt.verify(token, JWT_SECRET)

        if (decodedData) {
            req.farmerId = decodedData.farmerId
            next()
        }

    } catch (err) {
        console.log(err);
        res.status(401).json({
            success: false,
            message: "unauthorized"
        })
    }
}

module.exports = {
    userAuth,
    adminAuth,
    coodinatorAuth,
    farmerAuth
}