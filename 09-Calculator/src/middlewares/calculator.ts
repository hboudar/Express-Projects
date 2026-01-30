import {type Request, type Response, type NextFunction} from 'express';
import type { CalculationRequest } from '../types/index.js';

export function validateCalculationRequest(
    req: Request<{}, {}, CalculationRequest>,
    res: Response,
    next: NextFunction) {
  const { o, a, b } = req.body;

  const validOperators = ['+', '-', '*', '/'];

  if (!validOperators.includes(o)) {
    return res.status(400).json({ error: 'Invalid operator', timestamp: req.timestamp });
  }

  if (typeof a !== 'number' || typeof b !== 'number') {
    return res.status(400).json({ error: 'Operands must be numbers', timestamp: req.timestamp });
  }

  next();
}