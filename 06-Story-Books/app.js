const path = require('path')
const dotenv = require('dotenv')
const express = require('express')
const connectDb = require('./database/db')
const morgan = require('morgan')
const exphbs = require('express-handlebars')

dotenv.config({path: './config/config.env'})

connectDb();
const app = express();

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'));


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${port}`)
});