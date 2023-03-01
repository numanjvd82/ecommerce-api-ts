# Node.js TypeScript API with JWT Authentication and Cloudinary Image Uploads

This API provides the following features:

- User registration and login with JWT access tokens and token refreshing
- Product creation with image uploads to Cloudinary using Multer

## Technologies Used

- Node.js
- TypeScript
- Express
- MongoDB
- JWT (JSON Web Tokens) for authentication
- Cloudinary for image uploads
- Multer for handling file uploads

## Installation

1. Clone the repository
2. Install dependencies using `npm install`
3. Set environment variables in a `.env` file based on the `.env.example` file
4. Run the server using `npm start`

## API Endpoints

### Users

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login as an existing user and receive a JWT access token and refresh token
- `POST /api/users/refresh-token` - Refresh the access token using the refresh token

### Products

- `POST /api/products` - Create a new product with an image upload to Cloudinary

## Conclusion

That's it! This API provides a secure way for users to register, login, and create products with image uploads to Cloudinary. Feel free to use this code as a starting point for your own Node.js TypeScript APIs.
