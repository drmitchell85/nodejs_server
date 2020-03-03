const passport = require('passport');


module.exports = app => {

    // start OAuth flow
    // first user comes in on '/auth/google' route
    // then, our app tells passport to handle authentication using google strategy once user comes down that route
    // 'google' is hardcoded in GoogleStrategy
    // scope will ask to have access to certains pieces of information listed; these terms are hardcoded
    app.get(
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    // function looks similar to above, but now GoogleStragtegy has the code needed to get user details
    // Passport handles all of this internally
    // afterwards the 'accessToken" callback is called, logging our accessToken in the above method
    app.get('/auth/google/callback', passport.authenticate('google'));

};

