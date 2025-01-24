import bcrypt from 'bcrypt';
import { ICreateUser } from '../../interfaces/User/ICreateUser';
import User from '../../models/User';
import ServiceException from '../../exceptions/ServiceException';

class CreateUserService {
  static async execute({ name, email, password }: ICreateUser): Promise<User> {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      throw new ServiceException('Email already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
