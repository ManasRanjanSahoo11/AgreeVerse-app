const mongoose = require('mongoose');

const commonFields = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, unique: true },
    password: { type: String, unique: true }, // Only for manual signup (Google users won't have this)
    googleId: { type: String, unique: true }, // Store Google OAuth ID
    role: { type: String },
    createdAt: { type: Date, default: Date.now },
};

const adminSchema = new mongoose.Schema({ ...commonFields });

const coordinatorSchema = new mongoose.Schema({
    ...commonFields,
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
});

const farmerSchema = new mongoose.Schema({
    ...commonFields,
    coordinatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true },
});

const userSchema = new mongoose.Schema({ ...commonFields });



const cropSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageURL: { type: String, required: true },
    tag: { type: String, enum: ['vegetable', 'fruit', 'grain'], required: true },
    price: { type: Number, required: true, min: 0 },
    createdAt: { type: Date, default: Date.now }
});

const deliveryAddressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    country: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

const userPurchasedCropSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    purchasedCrops: { type: [mongoose.Types.ObjectId], ref: "Crop", required: true },
    quantity: { type: Number },
    paymentId: { type: String, required: true, unique: true },
    paymentMethod: { type: String, enum: ['credit_card', 'debit_card', 'upi', 'netbanking'] },
    paymentStatus: { type: String, enum: ['pending', 'completed', 'failed', 'refunded'], },
    totalAmount: { type: Number, required: true },
    deliveryAddress: { type: deliveryAddressSchema, required: true },
    purchasedAt: { type: Date, default: Date.now },
})

const Admin = mongoose.model('Admin', adminSchema);
const Coordinator = mongoose.model('Coordinator', coordinatorSchema);
const Farmer = mongoose.model('Farmer', farmerSchema);
const User = mongoose.model('User', userSchema);

const cropModel = mongoose.model('Crop', cropSchema)
const userPurchasedCropModel = mongoose.model('purchasedCrop', userPurchasedCropSchema)

module.exports = { Admin, Coordinator, Farmer, User, cropModel, userPurchasedCropModel };