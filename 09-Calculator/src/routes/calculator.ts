import {type Request,  Router} from 'express';
import type { CalculationRequest } from '../types/index.js';
import { validateCalculationRequest } from '../middlewares/calculator.js';

export const router = Router();

router.get('/', (req: Request, res) => {
  res.send({'message': 'Hello from Calculator Router', 'timestamp': req.timestamp});
});

router.get('/:id', (req: Request, res) => {
  const id = req.params.id;
  res.send({message: `Calculator ID received: ${id}`, timestamp: req.timestamp});
});


router.post('/', validateCalculationRequest, (req: Request<{}, {}, CalculationRequest>, res) => {
  const { o, a, b } = req.body;
  let result: number;
  
  switch (o) {
    case '+':
      result = a + b;
      break;
    case '-':
      result = a - b;
      break;
    case '*':
      result = a * b;
      break;
    case '/':
      if (b === 0) {
        return res.status(400).json({ error: 'Division by zero is not allowed', timestamp: req.timestamp });
      }
      result = a / b;
      break;
    default:
      return res.status(400).json({ error: 'Invalid operator', timestamp: req.timestamp });
  }

  res.json({ result, timestamp: req.timestamp });
});