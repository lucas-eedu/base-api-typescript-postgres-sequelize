import { Router } from 'express';

import UserController from '../controllers/UserController';

import CreateUserValidator from '../validators/User/CreateUserValidator';

const usersRouter = Router();

usersRouter.post('/create', CreateUserValidator, UserController.create);

export default usersRouter;
