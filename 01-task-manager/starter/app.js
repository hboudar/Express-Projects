require('dotenv').config();
const connectDB = require('./db/connect');
const express = require('express');

const routers = require('./routes/tasks');
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

const app = express();

//middleware : for parsing json data
app.use(express.static('./public'));
app.use(express.json());


//routes :

app.use('/api/v1/tasks', routers);
app.use(notFound);
app.use(errorHandlerMiddleware);


const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('Connected to database...');

    const port = process.env.PORT || 3000;
    app.listen(port, () => { console.log(`Server is running on http://localhost:${port}`); });
  
  } catch (error) {
    console.log(error);
  }
}

start();