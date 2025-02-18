const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { Admin, Coordinator, Farmer, User } = require('../models/db');

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
        const { id, displayName, emails } = profile;
        const email = emails[0].value;

        try {
            // Check if user exists in any role
            let user = await Admin.findOne({ email }) ||
                       await Coordinator.findOne({ email }) ||
                       await Farmer.findOne({ email }) ||
                       await User.findOne({ email });

            if (user) {
                // Update existing user if needed (merge profile information)
                user.name = displayName || user.name;
                user.googleId = id;
                await user.save();
                return done(null, user); // Return existing (updated) user
            }

            // Default role is "user" if not provided
            const role = "user";  // You can modify this based on frontend selection

            const newUser = {
                name: displayName,
                email: email,
                googleId: id
            };

            // Store user in the correct collection based on role
            if (role === 'admin') user = await Admin.create(newUser);
            else if (role === 'coordinator') user = await Coordinator.create(newUser);
            else if (role === 'farmer') user = await Farmer.create(newUser);
            else user = await User.create(newUser);

            return done(null, user);
        } catch (error) {
            return done(error, null);
        }
    }
));

// Serialize User
passport.serializeUser((user, done) => {
    done(null, { id: user._id, role: user.constructor.modelName });
});

// Deserialize User (Retrieve data)
passport.deserializeUser(async (obj, done) => {
    const { id, role } = obj;

    const Model = role === 'Admin' ? Admin
        : role === 'Coordinator' ? Coordinator
        : role === 'Farmer' ? Farmer
        : User; // Default to User

    try {
        const user = await Model.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;