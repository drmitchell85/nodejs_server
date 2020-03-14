// https://git.heroku.com/obscure-spire-73695.git 

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');

// use mongoose to connect to MongoDB Atlas
mongoose.connect(keys.mongoURI);

// create first express application
const app = express();

// (8.107) any requests will be parsed by this middleware and hand off to req.body property of incoming req object
app.use(bodyParser.json());

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
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
    // Express will serve up production assets: main.js, main.css
    app.use(express.static('client/build'));

    // Express will serve up the index.html file if it doesn't recognize the file
    const path = require('path');
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Heroku will inject the port to use while in production OR use local port while in dev env
const PORT = process.env.PORT || 5000;
app.listen(PORT); 