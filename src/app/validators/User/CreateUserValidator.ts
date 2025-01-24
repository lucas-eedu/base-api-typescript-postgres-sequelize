import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';

export default async function createUserValidation(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
        .required('Name is required')
        .min(3, 'Name must be at least 3 characters'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err: any) {
    res.status(400).json({
      message: 'Validation Failure',
      category: 'INPUT_VALIDATE_FAILURE',
      messages: err.inner,
    });
  }
}
