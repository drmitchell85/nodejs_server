// https://git.heroku.com/obscure-spire-73695.git 

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

// use mongoose to connect to MongoDB Atlas
mongoose.connect(keys.mongoURI);

// create first express application
const app = express();

// tell express to use cookies
app.use(
    cookieSession({
        // max age is 30 days
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

// two below statements allow passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

// Heroku will inject the port to use while in production OR use local port while in dev env
const PORT = process.env.PORT || 5000;
app.listen(PORT); 