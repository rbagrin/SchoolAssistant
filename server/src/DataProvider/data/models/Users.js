const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        required: [true, 'E-mail is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    role: {
        type: Number,
        required: [true, 'User role is required']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;