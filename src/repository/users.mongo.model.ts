import { Schema, model } from 'mongoose';
import { User } from '../entities/users';

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  surname: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'pro', 'admin'],
  },
  movies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Partner',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
