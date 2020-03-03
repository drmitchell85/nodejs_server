// determine our env and return appropriate credentials

// heroku hardcodes 'production' value
if(process.env.NODE_ENV === 'production') {
    // return prod keys
    modules.exports = require('./prod');
} else {
    // return dev keys; use dev.js
    modules.exports = require('./dev');
};