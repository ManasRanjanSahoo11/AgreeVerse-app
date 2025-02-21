const express = require('express')
const jwt = require('jsonwebtoken')
const coordinatorRouter = express.Router()
const dotenv = require('dotenv')
const { Coordinator } = require('../models/db')

dotenv.config()

coordinatorRouter.post('/signup', async (req, res) => {

    const coordinatorSignupRequiredBody = z.object({
        name: z.string(),
        email: z.string().email(),
        phoneNo: z.string().transform(data => Number(data)),
        password: z.string().min(6, { message: "Password must be at least 6 characters long." })
    })

    const parsedData = coordinatorSignupRequiredBody.safeParse(req.body)

    try {
        const { name, email, phoneNo, password } = parsedData.data;

        const exitingCoordinator = await Coordinator.findOne({ phoneNo, email })

        if (exitingCoordinator) return res.status(409).send("Coordinator already exits")

        const hash = await bcrypt.hash(password, 10)

        const newCoordinator = await Coordinator.create({
            name,
            email,
            phoneNo,
            password: hash
        })

        if (newCoordinator) {
            res.status(201).json({
                success: true,
                message: "New Coordinator created successfully"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server crash")
    }
})

coordinatorRouter.post('/signin', async (req, res) => {

    const coordinatorSignupRequiredBody = z.object({
        identifier: z.string().refine((value) => {
            return /\S+@\S+\.\S+/.test(value) || /^\d{10}$/.test(value);
        }, { message: "Invalid email or phone number format" }),
        password: z.string().min(6)
    });

    const parsedData = coordinatorSignupRequiredBody.safeParse(req.body)

    if (!parsedData.success) {
        return res.status(400).json({ success: false, message: parsedData.error.errors });
    }

    try {
        const { identifier, password } = parsedData.data;

        // Find Coordinator by email or phone
        const coordinator = await Coordinator.findOne({
            $or: [{ email: identifier }, { phone: identifier }]
        })

        if (!coordinator) return res.status(404).json({ success: false, message: "User not found" });

        // Compare password
        const comparePassword = await bcrypt.compare(password, coordinator.password);
        if (!comparePassword) return res.status(400).json({ success: false, message: "Invalid credentials" });

        //Generate JWT
        const token = jwt.sign({ userId: Coordinator._id }, process.env.JWT_COORDINATOR_SECRET, { expiresIn: "1h" })

        res.cookie("token", token, {
            httpOnly: true,  // Prevents JavaScript access (XSS protection)
            secure: true,    // Works only on HTTPS
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        }).status(200).json({
            success: true,
            message: 'Coordinator signin successfull.'
        })

    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server crash")
    }
})

coordinatorRouter.post('/signout', (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            secure: true,
            sameSite: "lax", // Send the cookie in same-site requests and some cross-site requests
            expires: new Date(0) // Expire the cookie immediately
        })

        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server err" });
    }
})

// Coordinator access there profile and perform the CURD operation
//add farmer
coordinatorRouter.post('/:coordinatorId/add-farmer', (req, res) => {

    /*
        const commonFields = {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phoneNo: { type: String, unique: true },
        password: { type: String }, // Only for manual signup (Google users won't have this)
        googleId: { type: String }, // Store Google OAuth ID
        createdAt: { type: Date, default: Date.now },
    };
    
    const farmerSchema = new mongoose.Schema({
        ...commonFields,
        coordinatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Coordinator', required: true },
    });
    
    */
   
    const { name, email, phoneNo, password, coordinatorId } = req.body

    
})

//update farmer
coordinatorRouter.put('/:coordinatorId/update-farmer/:updateFarmerId', (req, res) => {

})

//delete farmer
coordinatorRouter.delete('/:coordinatorId/detele-farmer/:deleteFarmerId', (req, res) => {

})

// get all farmers
coordinatorRouter.get('/:coordinatorId/all-farmers', (req, res) => {

})

module.exports = {
    coordinatorRouter
}