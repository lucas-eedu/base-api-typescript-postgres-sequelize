import { Router, Request, Response } from 'express';

const usersRouter = Router();

usersRouter.get('/', (req: Request, res: Response) => {
  res.status(200).send('Olá mundo');
});

export default usersRouter;
