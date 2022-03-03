import { Schema } from 'mongoose';

export interface StudentInterface {
  id: string;
  groupid: number;
  s_name: string;
  isSUBMIT: string;
  isINVITE: string;
  isACCEPTED: string;
  isPROPOSAL: string;
  isPROPOSALSUBMIT: string;
  s_rollno: string;
  s_email: string;
  s_batch: string;
  password: string;
  s_contact: string;
  s_department: string;
  s_status: string;
  s_tokens: any[];
  formid: { type: Schema.Types.ObjectId; ref: 'Form' };
  proposalid: { type: Schema.Types.ObjectId; ref: 'proposal' };
  groupRequest: string;
  ResponseCount: string;
  internal: Boolean;
}
export const StudentSchema = new Schema({
  id: {
    type: String,
    uppercase: true,
  },
  groupid: {
    type: Number,
    default: 0,
  },
  internal: {
    type: Boolean,
    default: false,
  },
  s_name: {
    type: String,
    trim: true,
  },
  isSUBMIT: {
    type: Boolean,
    default: false,
  },
  isINVITE: {
    type: Boolean,
    default: false,
  },
  isACCEPTED: {
    type: Boolean,
    default: false,
  },
  isPROPOSAL: {
    type: Boolean,
    default: false,
  },
  isPROPOSALSUBMIT: {
    type: Boolean,
    default: false,
  },
  s_rollno: {
    type: String,
    trim: true,
    uppercase: true,
  },
  s_email: {
    type: String,
    trim: true,
  },
  s_batch: {
    type: Number,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  s_contact: {
    type: String,
    trim: true,
  },
  s_department: {
    type: String,
    trim: true,
  },
  s_status: {
    type: String,
    trim: true,
  },
  s_tokens: [
    {
      token: String,
    },
  ],
  formid: { type: String },
  proposalid: { type: String },
  groupRequest: {
    type: String,
  },
  ResponseCount: {
    type: Number,
    trim: true,
    default: 0,
  },
});
