import express from 'express';
import loginUser from '../controllers/loginUser';
import registerUser from '../controllers/registerUser';
import verifyJwt from '../middlewares/verifyJwt';
import { Request, Response } from 'express';
import refreshTokenGenerator from '../controllers/refreshToken';
import logoutUser from '../controllers/logoutUser';

const router = express.Router();

router.post('/login', loginUser.loginUser);

// Protected route with our verifyJwt middleware
router.get('/getnotes', verifyJwt, (req: Request, res: Response) => {
  res.send('This is a protected route');
});

// Route for our refresh token
router.get('/refresh', refreshTokenGenerator);

// Route for our logout
router.get('/logout', logoutUser);

router.post('/register', registerUser);

export default router;
