import { sign, verify, Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response } from 'express';

const refreshTokenGenerator = (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const decoded = verify(
    token,
    process.env.JWT_REFRESH_KEY as Secret
  ) as JwtPayload;

  const newAccessToken = sign(
    { id: decoded.id, role: decoded.role },
    process.env.JWT_ACCESS_KEY as Secret,
    {
      expiresIn: '15m', // real app would be 15m
    }
  );

  return res.json({
    message: 'New access token created!',
    accessToken: newAccessToken,
  });
};

export default refreshTokenGenerator;
