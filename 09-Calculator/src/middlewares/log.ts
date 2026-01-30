import { type Request, type Response, type NextFunction} from 'express';


export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`${req.timestamp?.toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
}