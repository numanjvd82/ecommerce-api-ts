import express from 'express';
import loginUser from '../controllers/loginUser';
import registerUser from '../controllers/registerUser';
import verifyJwt from '../middlewares/verifyJwt';
import { Request, Response } from 'express';
import refreshTokenGenerator from '../controllers/refreshToken';

const router = express.Router();

router.post('/login', loginUser.loginUser);
router.get('/getnotes', verifyJwt, (req: Request, res: Response) => {
  res.send('This is a protected route');
});

// Route for our refresh token
router.get('/refresh', refreshTokenGenerator);

router.post('/register', registerUser);

export default router;
