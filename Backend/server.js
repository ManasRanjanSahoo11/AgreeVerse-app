const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config();

const { userRouter } = require('./routes/user')
const { adminRouter } = require('./routes/admin')
const { coordinatorRouter } = require('./routes/coordinator');
const { farmerRouter } = require('./routes/farmer');
const googleAuthRouter = require('./routes/googleAuth')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//Session Middleware
app.use(session({
    secret: "100xManas",
    resave: true,
    saveUninitialized: false
}))

//Initialize passport
app.use(passport.initialize())
app.use(passport.session())

// Use the authentication routes
app.use('/auth', googleAuthRouter);

app.use('/api/v1/user', userRouter)
app.use('/api/v1/admin', adminRouter)
app.use('/api/v1/coordinator', coordinatorRouter)
app.use('/api/v1/farmer', farmerRouter)

//connect to mongoDB and start the server
async function main() {
    try {
        await mongoose.connect(process.env.CONN_STRING)
    } catch (err) {
        return console.log("Error! while connecting BD " + err);
    }

    app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`)
}
main()