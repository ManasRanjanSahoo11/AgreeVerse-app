const mongoose = require('mongoose')

const userScema = mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    phoneNo: { type: String, require: true, unique: true },
    createdAt: { type: Date, default: Date.now },
})

const adminSchema = mongoose.Schema({
    adminName: { type: String, require: true },
    adminEmail: { type: String, require: true, unique: true },
    adminPhoneNo: { type: String, require: true, unique: true },
})

const coodinatorSchema = mongoose.Schema({
    coName: { type: String, require: true },
    coEmail: { type: String, require: true, unique: true },
    coPhoneNo: { type: String, require: true, unique: true },
})

const farmerSchema = mongoose.Schema({
    phoneNo: { type: String, require: true, unique: true },
    createdAt: { type: Date, default: Date.now },
})

const OTPSchema = mongoose.Schema({
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'Farmer', required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 300 }
});

const cropSchema = mongoose.Schema({
    title: String,
    desciption: String,
    imgURL: String,
    price: Number
})

const userModel = mongoose.model("User", userScema)
const adminModel = mongoose.model("Admin", adminSchema)
const coodinatorModel = mongoose.model("Coodinator", coodinatorSchema)
const farmerModel = mongoose.model('Farmer', farmerSchema)
const OTPModel = mongoose.model("OTP", OTPSchema)
const cropModel = mongoose.model('Crop', cropSchema)

module.exports = {
    userModel,
    adminModel,
    coodinatorModel,
    farmerModel,
    OTPModel,
    cropModel
}