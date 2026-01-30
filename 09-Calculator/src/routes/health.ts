import {type Request, Router} from 'express';

export const router = Router();

router.get('/', (req: Request, res) => {
  res.status(200).json({status: 'ok', timestamp: req.timestamp});
});