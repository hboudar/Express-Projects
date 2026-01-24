const dotenv = require('dotenv')
const express = require('express')
const connectDb = require('./database/db')

dotenv.config({path: './config/config.env'})

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${port}`)
});