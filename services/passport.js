const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; 
const mongoose = require('mongoose');
const keys = require('../config/keys');

// pulls a schema out of mongoose
const User = mongoose.model('users');

// create a serialized user to pass into requests
// user.id is created by Mongo; this is used bc a user may be logging in with different OAuth sources (Facebook, Google, etc)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// change id into a mongoose model instance
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // NOTE: this callback is performed after code is exchanged

        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);

        // first, see if user already exists
        // (!) this is an async task that returns a promise
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser) {
                    // user exists

                    // done(error, foundValue);
                    done(null, existingUser);
                } else {
                    // user does not exist
                    new User({ googleId: profile.id })
                        .save()
                        .then(user => done(null, user));
                }
            });
    })
);