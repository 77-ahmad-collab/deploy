import { Schema } from 'mongoose';
export interface Coordinator {
  name: string;
  id: number;
  email: string;
  contact: string;
  designation: string;
  password: string;
  locationOfEvaluation: string[];
}
export const CoordinatorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  locationOfEvaluation: {
    type: [String],
  },
});
