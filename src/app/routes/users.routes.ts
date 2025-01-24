import { Router, Request, Response } from 'express';
import User from '../models/User';

const usersRouter = Router();

usersRouter.get('/', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default usersRouter;
