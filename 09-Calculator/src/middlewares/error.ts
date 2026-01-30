import {type Request, type Response, type NextFunction} from 'express';


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(`Error occurred at ${req.timestamp?.toISOString()}:`, err.message);
  res.status(500).json({error: 'Internal Server Error', message: err.message, timestamp: req.timestamp});
}
