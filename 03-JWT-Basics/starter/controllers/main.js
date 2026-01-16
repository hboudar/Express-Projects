const jwt = require('jsonwebtoken');
const customError = require('../errors/custom-error');


const login = async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        throw new customError('Please provide username and password', 400);
    }

    const id = new Date().getDate(); // fake user id

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ msg: 'user created', token });2
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new customError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const luckyNumber = Math.floor(Math.random() * 100);

        res.status(200).json({ msg: `Hello, ${decoded.username}`, secret: `Your lucky number is ${luckyNumber}` });
    } catch (error) {
        throw new customError('Not authorized to access this route', 401);
    }
}

module.exports = { login, dashboard };