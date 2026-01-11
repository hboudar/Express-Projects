require('dotenv').config();

const connectDB = require('./db/connect');
const products = require('./models/product');

const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Connected to database...');

    // Clear existing products
    await products.deleteMany();
    console.log('Existing products deleted...');

    // Insert new products
    await products.create(jsonProducts);
    console.log('Products populated successfully...');
    
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();