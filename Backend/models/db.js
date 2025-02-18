const mongoose = require('mongoose');

const commonFields = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: { type: String, unique: true },
    password: { type: String }, // Only for manual signup (Google users won't have this)
    googleId: { type: String }, // Store Google OAuth ID
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


const Admin = mongoose.model('Admin', adminSchema);
const Coordinator = mongoose.model('Coordinator', coordinatorSchema);
const Farmer = mongoose.model('Farmer', farmerSchema);
const User = mongoose.model('User', userSchema);

module.exports = { Admin, Coordinator, Farmer, User };