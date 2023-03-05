import { Schema, model, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  category: string;
  imgUrl: string;
  isFeatured: boolean;
  createdAt?: Date;
  quantity: number;
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  category: {
    type: String,
    enum: ['Electronics', 'Clothing', 'Furniture', 'Books', 'Other'],
    required: true,
  },
  imgUrl: {
    type: String,
    required: true,
    trim: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

export default model<IProduct>('Product', ProductSchema);
