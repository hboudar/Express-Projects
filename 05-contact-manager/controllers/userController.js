const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModule')

const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if (!username || !password || !email) {
        res.status(400);
        throw new Error('All fields are mandatory!');
    }

    const isEmailTaken = await User.findOne({email});
    if (isEmailTaken) {
        res.status(400);
        throw new Error('User email already taken!');
    }

    //hash password
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        username,
        email,
        password: hashPassword,
    });

    console.log(`User created : ${user}`);
    if (!user) {
        res.status(400);
        throw new Error('User was not created');
    }
    res.status(201).json({_id: user.id, email: user.email});
});


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
    }

    const user = await User.findOne({email});
    if (user) {
        if ((await bcrypt.compare(password, user.password))) {
            const accessToken = await jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    userId: user.id,
                },
            }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "5m"})
            res.status(200).json({accessToken});
        } else {
            res.status(401)
            throw new Error("invalid Password");
        }
    }
    res.status(404)
    throw new Error('User Not Found');
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};