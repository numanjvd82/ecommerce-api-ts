import { v2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (path: string) => {
  try {
    const result = await v2.uploader.upload(path, {
      folder: 'products',
      width: 500,
      height: 500,
      crop: 'fill',
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

export { uploadFileToCloudinary };
