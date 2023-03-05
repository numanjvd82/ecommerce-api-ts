import Products, { IProduct } from '../models/Products';
import { Request, Response } from 'express';
import { uploadFileToCloudinary } from '../config/cloudinary';

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Products.find();
    res
      .status(200)
      .json({ message: 'Products fetched successfully', products });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await Products.findById(id);
    res.status(200).json({ message: 'Product fetched successfully', product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createProduct = async (req: Request<{}, {}, IProduct>, res: Response) => {
  const { path } = req.file;
  const { name, price, description, category, isFeatured, quantity } = req.body;

  // upload image to cloudinary

  try {
    const result = await uploadFileToCloudinary(path);

    // save the product to the database
    const newProduct = {
      name,
      price,
      description,
      category,
      isFeatured,
      quantity,
      imgUrl: result.secure_url,
    };

    const product = await Products.create(newProduct);
    return res
      .status(201)
      .json({ message: 'Product created successfully', product });
  } catch (err) {
    return res.status(409).json({ message: err.message });
  }
};

export default { getProducts, getSingleProduct, createProduct };
