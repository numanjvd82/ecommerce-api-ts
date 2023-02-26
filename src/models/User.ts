import { Schema, model, Document } from 'mongoose';


export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role?: string;
  createdAt?: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<IUser>('User', UserSchema);
