import { Schema } from 'mongoose';
export interface Marks {
  std1_coherence_with_group: number[];
  std1_intellectual_contribution: number[];
  std1_name: string;
  std1_response_to_questions: number[];
  std1_rollNo: string;
  std2_coherence_with_group: number[];
  std2_intellectual_contribution: number[];
  std2_name: string;
  std2_response_to_questions: number[];
  std2_rollNo: string;
  std3_coherence_with_group: number[];
  std3_intellectual_contribution: number[];
  std3_name: string;
  std3_response_to_questions: number[];
  std3_rollNo: string;
  std4_coherence_with_group: number[];
  std4_intellectual_contribution: number[];
  std4_name: string;
  std4_response_to_questions: number[];
  std4_rollNo: string;
}
export const MarksSchema = new Schema({
  std1_coherence_with_group: {
    type: [Number],
    required: true,
  },
  std1_intellectual_contribution: {
    type: [Number],
    required: true,
  },
  std1_name: {
    type: String,
    required: true,
  },
  std1_response_to_questions: {
    type: [Number],
    required: true,
  },
  std1_rollNo: {
    type: String,
    required: true,
    uppercase: true,
  },

  std2_coherence_with_group: {
    type: [Number],
    required: true,
  },
  std2_intellectual_contribution: {
    type: [Number],
    required: true,
  },
  std2_name: {
    type: String,
    required: true,
  },
  std2_response_to_questions: {
    type: [Number],
    required: true,
  },
  std2_rollNo: {
    type: String,
    required: true,
    uppercase: true,
  },

  std3_coherence_with_group: {
    type: [Number],
    required: true,
  },
  std3_intellectual_contribution: {
    type: [Number],
    required: true,
  },
  std3_name: {
    type: String,
    required: true,
  },
  std3_response_to_questions: {
    type: [Number],
    required: true,
  },
  std3_rollNo: {
    type: String,
    required: true,
    uppercase: true,
  },

  std4_coherence_with_group: {
    type: [Number],
  },
  std4_intellectual_contribution: {
    type: [Number],
  },
  std4_name: {
    type: String,
  },
  std4_response_to_questions: {
    type: [Number],
  },
  std4_rollNo: {
    type: String,
    uppercase: true,
  },
});
