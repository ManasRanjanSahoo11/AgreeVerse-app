const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const { userRouter } = require('./routes/user')
const { adminRouter } = require('./routes/admin')
const { coordinatorRouter } = require('./routes/coordinator');
const { farmerRouter } = require('./routes/farmer');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/v1/api/user', userRouter)
app.use('/v1/api/admin', adminRouter)
app.use('/v1/api/codinator', coordinatorRouter)
app.use('/v1/api/farmer', farmerRouter)

//connect to mongo and start the server
async function main() {
    try {
        await mongoose.connect(process.env.CONN_STRING)
    } catch (err) {
        return console.log("Error! while connecting BD " + err);
    }

    app.listen(process.env.PORT, () => `Server running on port ${process.env.PORT}`)
}
main()