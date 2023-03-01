import { v2 } from 'cloudinary';

v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dav9niuk4',
  api_key: process.env.CLOUDINARY_API_KEY || '352819766948764',
  api_secret:
    process.env.CLOUDINARY_API_SECRET || 'Hyd_KA2Ul3lp0st-nfYAK02SIMk',
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
