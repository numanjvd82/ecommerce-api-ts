import multer from 'multer';
import { Request } from 'express';
import path from 'path';

interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}

const storage = multer.diskStorage({
  destination: (req: Request, file: UploadedFile, cb: Function) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req: Request, file: UploadedFile, cb: Function) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: UploadedFile,
  cb: multer.FileFilterCallback
) => {
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB
  },
});

export default upload;
