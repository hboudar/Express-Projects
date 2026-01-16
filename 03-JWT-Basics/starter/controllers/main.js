const jwt = require('jsonwebtoken');
const BadRequest = require('../errors/bad-request');


const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        throw new BadRequest('Please provide username and password');
    }

    const id = new Date().getDate(); // fake user id

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ msg: 'user created', token });2
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({ msg: `Hello, ${req.user.username}`, secret: `Here is your lucky number: ${luckyNumber}` });
}

module.exports = { login, dashboard };