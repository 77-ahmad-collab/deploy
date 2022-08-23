import { Schema } from 'mongoose';
export interface External {
  name: string;
  id: number;
  email: string;
  contact: string;
  designation: string;
  password: string;
  projectList: string[];
  finalprojectList: string[];
  respondedList: string[];
  finalrespondedList: string[];
  isFirstTime: boolean;
}
export const ExternalSchema = new Schema({
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
  projectList: {
    type: [String],
    default: [],
  },
  finalprojectList: {
    type: [String],
    default: [],
  },

  respondedList: {
    type: [String],
    default: [],
  },
  finalrespondedList: {
    type: [String],
    default: [],
  },
  isFirstTime: {
    type: Boolean,
    default: true,
  },
});
