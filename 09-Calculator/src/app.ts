import express from 'express';
import { healthRouter, calculatorRouter } from './routes/index.js';
import { timeLogger, logger, errorHandler } from './middlewares/index.js';

const app = express();

const port = 3000;



//middlewares
app.use(express.json());
app.use(timeLogger);
app.use(logger);



app.use('/health', healthRouter);
app.use('/calculator', calculatorRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Running on http://localhost:${port}`);
});