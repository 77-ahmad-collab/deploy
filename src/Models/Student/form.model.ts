import { Schema } from 'mongoose';

export interface Form {
  mem_count: number;
  mem1: string;
  mem2: string;
  mem3: string;
  mem4: string;
  s_internal: string;
  s_external: string;
  s_proj_title: string;
  s_organization: string;
  internal_designation: string;
  external_designation: string;
  project_description: string;
  reject: string;
  reject1: string;
  internalAdvisor_status: string;
  proposal_status: String;
  internalAdvisor_remarks: [index: String];
  proposal_remarks: [index: string];
  external_evaluator: string;
  isProgressResponded: boolean;
}

export const FormSchema = new Schema({
  mem_count: {
    type: Number,
  },

  mem1: {
    type: String,
    uppercase: true,
  },

  mem2: {
    type: String,
    uppercase: true,
  },
  mem3: {
    type: String,
    uppercase: true,
  },
  mem4: {
    type: String,
    uppercase: true,
  },
  s_internal: {
    type: String,
    trim: true,
  },
  s_external: {
    type: String,
    trim: true,
  },
  s_proj_title: {
    type: String,
    trim: true,
  },
  s_organization: {
    type: String,
    trim: true,
  },
  internal_designation: {
    type: String,
    trim: true,
  },
  external_designation: {
    type: String,
    trim: true,
  },
  project_description: {
    type: String,
    trim: true,
  },
  reject: {
    type: String,
    uppercase: true,
    default: '',
  },
  reject1: {
    type: String,
    uppercase: true,
    default: '',
  },
  internalAdvisor_status: {
    type: String,
    trim: true,
    default: 'UNCLEAR',
  },
  proposal_status: {
    type: String,
    trim: true,
    default: 'UNCLEAR',
  },
  internalAdvisor_remarks: {
    type: [String],
  },
  proposal_remarks: {
    type: [String],
  },
  external_evaluator: {
    type: String,
    trim: true,
  },
  isProgressResponded: {
    type: Boolean,
    default: true,
  },
});
