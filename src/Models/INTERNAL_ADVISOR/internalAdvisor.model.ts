import { Schema } from 'mongoose';
export interface InternalAdvisor {
  name: string;
  id: number;
  email: string;
  contact: string;
  designation: string;
  password: string;
  advisorformid: string;
  projectList: string[];
  respondedList: string[];
}
export const InternalAdvisorSchema = new Schema({
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
  advisorformid: {
    type: String,
    default: 'NONE',
  },
  attendanceid: {
    type: String,
    default: 'NONE',
  },
  projectList: {
    type: [String],
    default: [],
  },
  respondedList: {
    type: [String],
    default: [],
  },
});
