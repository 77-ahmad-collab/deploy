import { Schema } from 'mongoose';
export interface FinalEvaluation {
  location: string;
  project_title: string;
  group_leader: string;
  supervisor: string;
  co_supervisor: string;
  external: string;
  chairmen: string;
  external_evaluator: string;
  external_evaluator2: string;
  external_evaluator3: string;
  date: string;
  time: string;
  isProgressResponded: boolean;
  isResultSubmitted: boolean;
  isEvaluationResponded: boolean;
  isfinalEvaluationResponded: boolean;
  isreportEvaluationResponded: boolean;
  midEvaluation: boolean;
}
export const FinalEvaluationSchema = new Schema({
  location: {
    type: String,
    trim: true,
    required: true,
  },
  project_title: {
    type: String,
    trim: true,
    required: true,
  },
  group_leader: {
    type: String,
    trim: true,
    required: true,
  },
  supervisor: {
    type: String,
  },
  co_supervisor: {
    type: String,
  },
  external: {
    type: String,
  },
  chairmen: {
    type: String,
  },
  external_evaluator: {
    type: String,
  },
  external_evaluator2: {
    type: String,
  },
  external_evaluator3: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  isProgressResponded: {
    type: Boolean,
    default: true,
  },
  isResultSubmitted: {
    type: Boolean,
    default: true,
  },
  isEvaluationResponded: {
    type: Boolean,
    default: true,
  },
  isfinalEvaluationResponded: {
    type: Boolean,
    default: true,
  },
  isreportEvaluationResponded: {
    type: Boolean,
    default: true,
  },
  midEvaluation: {
    type: Boolean,
    default: true,
  },
});
