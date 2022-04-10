import { Schema } from 'mongoose';
export interface Evaluation {
  location: string;
  project_title: string;
  group_leader: string;
  supervisor: string;
  co_supervisor: string;
  external: string;
  chairmen: string;
  external_evaluator: string;
  date: string;
  time: string;
}
export const EvaluationSchema = new Schema({
  location: {
    type: String,
    trim: true,
  },
  project_title: {
    type: String,
  },
  group_leader: {
    type: String,
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
  date: {
    type: String,
  },
  time: {
    type: String,
  },
});
