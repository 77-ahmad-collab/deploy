import { Schema } from 'mongoose';

export interface Proposal {
  category: string;
  characteristics: string;
  outline: string;
  objective: string;
  scope: string;
  methodology: string;
  exp_outcomes: string;
  exp_budget: string;
  alignment: string;
  co_supervisor: string;
}
export const ProposalScehma = new Schema({
  category: {
    type: String,
    trim: true,
  },
  characteristics: {
    type: String,
    trim: true,
  },
  outline: {
    type: String,
    trim: true,
  },
  objective: {
    type: String,
    trim: true,
  },
  scope: {
    type: String,
    trim: true,
  },
  methodology: {
    type: String,
    trim: true,
  },
  exp_outcomes: {
    type: String,
    trim: true,
  },
  exp_budget: {
    type: String,
    trim: true,
  },
  alignment: {
    type: String,
    trim: true,
  },
  co_supervisor: {
    type: String,
    trim: true,
  },
});
