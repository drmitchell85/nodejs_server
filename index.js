// https://git.heroku.com/obscure-spire-73695.git 

// import express library
// require gets access to the express library
const express = require('express');

// create first express application
const app = express();

// create a route handler and associate it with a route
app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

// Heroku will inject the port to use while in production OR use local port while in dev env
const PORT = process.env.PORT || 5000;
app.listen(PORT); 