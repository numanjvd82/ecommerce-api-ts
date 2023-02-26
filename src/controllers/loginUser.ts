import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import User from '../models/User';
import { Jwt, JwtPayload, Secret, sign, verify } from 'jsonwebtoken';

type UserPayload = {
  id: string;
  role: string;
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const isMatch = await compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload: UserPayload = {
      id: foundUser.id,
      role: foundUser.role,
    };

    const accessToken = sign(payload, process.env.JWT_ACCESS_KEY as Secret, {
      expiresIn: '20s',
    });

    const refreshToken = sign(payload, process.env.JWT_REFRESH_KEY as Secret, {
      expiresIn: '7d',
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      //secure: true, // This is only for production
    });

    res.json({ accessToken });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default { loginUser };
