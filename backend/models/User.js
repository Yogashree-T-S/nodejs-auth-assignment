const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    company: String,
    age: Number,
    dob: String,
    image: String,
    otp: String,
    otpExpiry: Date
});

module.exports = mongoose.model('User', userSchema);
