import {type Request, type Response, type NextFunction} from 'express';


export function timeLogger(req: Request, res: Response, next: NextFunction) {
  req.timestamp = new Date();
  next();
}