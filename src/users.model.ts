import mongoose from 'mongoose';
import { Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
}

export const UserSchema = new Schema({
  email: {
    type: String,
  },
  password: String,
});
