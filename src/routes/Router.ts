import express from 'express';
import loginUser from '../controllers/loginUser';
import registerUser from '../controllers/registerUser';
import verifyJwt from '../middlewares/verifyJwt';
import { Request, Response } from 'express';
import refreshTokenGenerator from '../controllers/refreshToken';
import logoutUser from '../controllers/logoutUser';
import upload from '../config/multer';
import productController from '../controllers/productController';

const router = express.Router();

router.post('/login', loginUser.loginUser);

// Protected route with our verifyJwt middleware
router.get('/getnotes', verifyJwt, (req: Request, res: Response) => {
  res.send(`Your id is: ${req.body.id} and your email is: ${req.body.role}`);
});

// Route for our refresh token
router.get('/refresh', refreshTokenGenerator);

// Route for our logout
router.get('/logout', logoutUser);

// Route for our create product
router.post(
  '/create',
  verifyJwt,
  upload.single('image'),
  productController.createProduct
);

// Route for our get products
router.get('/products', productController.getProducts);

// Route for our get single product
router.get('/products/:id', productController.getSingleProduct);

router.post('/register', registerUser);

export default router;
