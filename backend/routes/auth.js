const express = require('express');
const router = express.Router();
const User = require('../models/User');
const multer = require('multer');
const path = require('path');


// Multer setup for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

// Register route
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        const { name, email, password, company, age, dob } = req.body;

        // Validate presence of required fields
        if (!name) return res.status(400).json({ message: 'Name is required' });
        if (!email) return res.status(400).json({ message: 'Email is required' });
        if (!password) return res.status(400).json({ message: 'Password is required' });
        if (!company) return res.status(400).json({ message: 'Company name is required' });
        if (!age) return res.status(400).json({ message: 'Age is required' });
        if (!dob) return res.status(400).json({ message: 'Date of birth is required' });
        if (!req.file) return res.status(400).json({ message: 'Image upload is required' });

        // Validate email format
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        // Validate password strength
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters, include uppercase, lowercase letters, and a number' });
        }

        // Check if user exists
        const existing = await User.findOne({ email });
        if (existing) return res.status(409).json({ message: 'User already exists' });

        // Create user
        const newUser = new User({
            name,
            email,
            password,
            company,
            age,
            dob,
            image: req.file.path
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ message: 'Server error during registration' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!password) return res.status(400).json({ message: 'Password is required' });

    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });

    try {
        const user = await User.findOne({ email, password });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60 * 1000);

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();

        res.json({ message: 'OTP sent', otp });
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email) return res.status(400).json({ message: 'Email is required' });
    if (!otp) return res.status(400).json({ message: 'OTP is required' });

    if (!emailRegex.test(email)) return res.status(400).json({ message: 'Invalid email format' });

    try {
        const user = await User.findOne({ email });

        if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.json({ message: 'OTP verified', user });
    } catch (err) {
        console.error('OTP Verification Error:', err);
        res.status(500).json({ message: 'Server error during OTP verification' });
    }
});


//  Delete Account
router.delete('/delete-account/:email', async (req, res) => {
    try {
        await User.deleteOne({ email: req.params.email });
        res.json({ message: 'Account deleted' });
    } catch (err) {
        console.error('Delete Error:', err);
        res.status(500).json({ message: 'Error deleting account' });
    }
});

module.exports = router;
