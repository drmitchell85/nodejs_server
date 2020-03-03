const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String
});

// tell mongoose that a collection needs to be made
// first arg is name of collection; second arg is the schema to use
mongoose.model('users', userSchema);