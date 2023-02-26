import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import User from '../models/User';

const registerUser = async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    console.log(hashedPassword);

    res.status(201).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

export default registerUser;
