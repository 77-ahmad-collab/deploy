import { Schema } from 'mongoose';
export interface Marks {
  std1_coherence_with_group: number;
  std1_intellectual_contribution: number;
  std1_name: string;
  std1_response_to_questions: number;
  std1_rollNo: string;
  std1_weighted_average: number;
  std2_coherence_with_group: number;
  std2_intellectual_contribution: number;
  std2_name: string;
  std2_response_to_questions: number;
  std2_rollNo: string;
  std2_weighted_average: number;
  std3_coherence_with_group: number;
  std3_intellectual_contribution: number;
  std3_name: string;
  std3_response_to_questions: number;
  std3_rollNo: string;
  std3_weighted_average: number;
  std4_coherence_with_group: number;
  std4_intellectual_contribution: number;
  std4_name: string;
  std4_response_to_questions: number;
  std4_weighted_average: number;
  std4_rollNo: string;
  supervior_id: number;
  count: number;
  project_title: string;
}
export const MarksSchema = new Schema({
  std1_coherence_with_group: {
    type: Number,
    required: true,
  },
  std1_intellectual_contribution: {
    type: Number,
    required: true,
  },
  std1_name: {
    type: String,
    required: true,
  },
  std1_response_to_questions: {
    type: Number,
    required: true,
  },
  std1_rollNo: {
    type: String,
    required: true,
    uppercase: true,
  },
  std1_weighted_average: {
    type: Number,
  },
  std2_coherence_with_group: {
    type: Number,
    required: true,
  },
  std2_intellectual_contribution: {
    type: Number,
    required: true,
  },
  std2_name: {
    type: String,
    required: true,
  },
  std2_response_to_questions: {
    type: Number,
    required: true,
  },
  std2_rollNo: {
    type: String,
    required: true,
    uppercase: true,
  },
  std2_weighted_average: {
    type: Number,
  },

  std3_coherence_with_group: {
    type: Number,
    required: true,
  },
  std3_intellectual_contribution: {
    type: Number,
    required: true,
  },
  std3_name: {
    type: String,
    required: true,
  },
  std3_response_to_questions: {
    type: Number,
    required: true,
  },
  std3_rollNo: {
    type: String,
    required: true,
    uppercase: true,
  },
  std3_weighted_average: {
    type: Number,
  },

  std4_coherence_with_group: {
    type: Number,
  },
  std4_intellectual_contribution: {
    type: Number,
  },
  std4_name: {
    type: String,
  },
  std4_response_to_questions: {
    type: Number,
  },
  std4_rollNo: {
    type: String,
    uppercase: true,
  },
  std4_weighted_average: {
    type: Number,
  },
  count: {
    type: Number,
    default: 0,
  },
  project_title: {
    type: String,
  },
  supervior_id: {
    type: Number,
  },
});
