const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt')
const { model } = require('mongoose');

router.post('/register', async (req, res) => {
    const{name, email, password} = req.body;
    try {
        // Hash the password
        const hash = await bcrypt.hash(password, 10);
        // Create a new user with hashed password
        const newUser = await User.create({ name, email, password: hash });
        res.send('User Registered Successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const temp = {
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    _id: user.id,
                };
                return res.json(temp); // Password is correct, return user data
            } else {
                return res.status(400).json({ message: 'Incorrect Password' }); // Password is incorrect
            }
        } else {
            return res.status(400).json({ message: 'User not found' }); // User not found
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/getallusers', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users);
    } catch (error) {
        return res.status(400).json({error});
    }
});

module.exports = router;