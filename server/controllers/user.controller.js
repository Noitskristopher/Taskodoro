const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_KEY;

module.exports = {
    registerUser: async (req, res) => {
        try {
            // want to check if user already in db
            const potentialUser = await User.findOne({ email: req.body.email });
            if (potentialUser) {
                res.status(400).json({ message: 'Email is already taken' })
            } else {
                // Create User
                const newUser = await User.create(req.body)
                console.log(newUser)
                // create jsonwebtoken
                const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: '2h' })
                console.log(userToken)

                // send back logged in user
                res.cookie('userToken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 }).status(201).json({ message: "User logged in", user: newUser })
            }
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: err })
        }
    }
}