const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { Admin, Coordinator, Farmer, User } = require('../models/db')

passport.use(new GoogleStrategy(
    {
        clientId,
        clientSecret,
        callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {

        const { id, dispalyName, emails } = profile
        const email = emails[0].value

        try {

            //check user exits in any role?
            const user = await Admin.findOne({ email }) ||
                await Coordinator.findOne({ email }) ||
                await Farmer.findOne({ email }) ||
                await User.findOne({ email })

            if (!user) {
                let role = "user"; // Default to "user" if role is not sent

                const newUser = {
                    name: dispalyName,
                    email: email,
                    googleId: id
                }

                if (role == 'admin') user = await Admin.create(newUser)
                else if (role == 'coordinator') user = await Coordinator.create(newUser)
                else if (role == 'farmer') user = await Farmer.create(newUser)
                else user = await User.create(newUser)

                return done(null, user)
            }
        } catch (error) {
            return done(error, null);
        }
    }
))

// Serialize User
passport.serializeUser((user, done) => {
    done(null, { id: user._id, role: user.constructor.modelName });
});

// Deserialize user(retrive data)
passport.deserializeUser(async (obj, done) => {
    const { id, role } = obj;

    //When a user logs in, Passport.js saves their user ID in a session.The deserializeUser function retrieves the full user object from the database using that ID when needed.
    const Model = role === 'Admin' ? Admin
        : role === 'Coordinator' ? Coordinator
            : role === 'Farmer' ? Farmer
                : User; // Default to User

    try {
        const user = await Model.findById(id)
        done(null, user)
    } catch (error) {
        done(error, null)
    }

})

module.exports = passport;