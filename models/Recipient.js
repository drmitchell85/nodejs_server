const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema ({
    email: String,
    responded: { type: Boolean, default: false }
});

// rather than registering with mongoose we export
module.exports = recipientSchema;