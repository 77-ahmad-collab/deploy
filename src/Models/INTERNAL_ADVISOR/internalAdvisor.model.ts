import { Schema } from 'mongoose';
export interface InternalAdvisor {
  name: string;
  id: number;
  email: string;
  contact: string;
  designation: string;
  password: string;
  advisorformid: string;
  attendanceid: string;
  projectList: string[];
  finalprojectList: string[];
  reportprojectList: string[];
  reportrespondedList: string[];
  respondedList: string[];
  finalrespondedList: string[];
  isFirstTime: boolean;
  progressProjectList: string[];
  progressRespondedList: string[];
  isProgressFirstTime: boolean;
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
  finalprojectList: {
    type: [String],
    default: [],
  },
  reportprojectList: {
    type: [String],
    default: [],
  },
  reportrespondedList: {
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
  progressProjectList: {
    type: [String],
    default: [],
  },
  progressRespondedList: {
    type: [String],
    default: [],
  },
  isProgressFirstTime: {
    type: Boolean,
    default: true,
  },
});
