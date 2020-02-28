// import express library
// require gets access to the express library
const express = require('express');

// create first express application
const app = express();

// create a route handler and associate it with a route
app.get('/', (req, res) => {
    res.send({ hi: 'there'});
});

app.listen(5000);  