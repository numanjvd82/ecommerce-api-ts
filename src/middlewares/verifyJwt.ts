import { verify, Secret, JwtPayload, Jwt } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'No token Found' });
  }
  const accessToken = token.split(' ')[1];
  verify(accessToken, process.env.JWT_ACCESS_KEY as Secret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.body.id = (decoded as JwtPayload).id;
    req.body.role = (decoded as JwtPayload).role;
  });
  console.log(req.body);
  next();
};

export default verifyJwt;
