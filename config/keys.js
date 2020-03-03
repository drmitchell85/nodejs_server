// determine our env and return appropriate credentials

// heroku hardcodes 'production' value
if(process.env.NODE_ENV === 'production') {
    // return prod keys
    module.exports = require('./prod');
} else {
    // return dev keys; use dev.js
    module.exports = require('./dev');
};