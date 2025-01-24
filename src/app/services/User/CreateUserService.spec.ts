import { ICreateUser } from '../../interfaces/User/ICreateUser';
import CreateUserService from './CreateUserService';
import User from '../../models/User';
import ServiceException from '../../exceptions/ServiceException';

jest.mock('../../models/User');

describe('CreateUserService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a user successfully', async () => {
    const userData: ICreateUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const mockedUser = {
      ...userData,
      password: 'hashedPassword',
    };

    (User.findOne as jest.Mock).mockResolvedValue(null);
    (User.create as jest.Mock).mockResolvedValue(mockedUser);

    const result = await CreateUserService.execute(userData);

    expect(result).toEqual(mockedUser);
    expect(User.findOne).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(User.create).toHaveBeenCalledWith({
      name: userData.name,
      email: userData.email,
      password: expect.any(String),
    });
  });

  it('should throw an error if email already exists', async () => {
    const userData: ICreateUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    (User.findOne as jest.Mock).mockResolvedValueOnce({
      email: userData.email,
    });

    await expect(CreateUserService.execute(userData)).rejects.toThrowError(
      new ServiceException('Email already exists', 400),
    );
  });
});
