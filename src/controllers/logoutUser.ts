import { Request, Response } from 'express';

const logoutUser = (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: 'No cookie found' });
  }
  res.clearCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'none',
    secure: true, // This is only for production
  });

  res.json({ message: 'User logged out' });
};

export default logoutUser;
