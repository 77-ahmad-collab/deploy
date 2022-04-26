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

export const InfoSchema = new Schema({
  name: String,
  rollNo: String,
  year: String,
  batch: String,
  subject: String,
  department: String,
  University: String,
});
export interface Info {
  name: String;
  rollNo: String;
  year: String;
  batch: String;
  subject: String;
  department: String;
  University: String;
}
