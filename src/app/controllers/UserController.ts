import { Request, Response, NextFunction } from 'express';
import CreateUserService from '../services/User/CreateUserService';

class UserController {
  static async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { name, email, password } = req.body;

      const user = await CreateUserService.execute({ name, email, password });

      return res
        .status(201)
        .json({ message: 'User created successfully!', user });
    } catch (error) {
      return next(error);
    }
  }
}

export default UserController;
