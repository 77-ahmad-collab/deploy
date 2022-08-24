import { Schema } from 'mongoose';
export interface FinalEvaluationMarks {
  count: number;
  supervior_id: string;
  project_title: string;

  std1_name: string;
  std1_rollNo: string;
  std1_Relevance_Content: number[];
  std1_Organization_and_Delivery: number[];
  std1_Design_or_Layout: number[];
  std1_Time_Management: number[];
  std1_Questions_and_Answers: number[];
  std1_weighted_average: number;
  std1_Relevance_Content_average: number;
  std1_Organization_and_Delivery_average: number;
  std1_Design_or_Layout_average: number;
  std1_Time_Management_average: number;
  std1_Questions_and_Answers_average: number;

  std2_name: string;
  std2_rollNo: string;
  std2_Relevance_Content: number[];
  std2_Organization_and_Delivery: number[];
  std2_Design_or_Layout: number[];
  std2_Time_Management: number[];
  std2_Questions_and_Answers: number[];
  std2_weighted_average: number;
  std2_Relevance_Content_average: number;
  std2_Organization_and_Delivery_average: number;
  std2_Design_or_Layout_average: number;
  std2_Time_Management_average: number;
  std2_Questions_and_Answers_average: number;

  std3_name: string;
  std3_rollNo: string;
  std3_Relevance_Content: number[];
  std3_Organization_and_Delivery: number[];
  std3_Design_or_Layout: number[];
  std3_Time_Management: number[];
  std3_Questions_and_Answers: number[];
  std3_weighted_average: number;
  std3_Relevance_Content_average: number;
  std3_Organization_and_Delivery_average: number;
  std3_Design_or_Layout_average: number;
  std3_Time_Management_average: number;
  std3_Questions_and_Answers_average: number;

  std4_name: string;
  std4_rollNo: string;
  std4_Relevance_Content: number[];
  std4_Organization_and_Delivery: number[];
  std4_Design_or_Layout: number[];
  std4_Time_Management: number[];
  std4_Questions_and_Answers: number[];
  std4_weighted_average: number;
  std4_Relevance_Content_average: number;
  std4_Organization_and_Delivery_average: number;
  std4_Design_or_Layout_average: number;
  std4_Time_Management_average: number;
  std4_Questions_and_Answers_average: number;

  id: number;
  comment: string[];
  isPanelSubmitted: boolean;
}
export const FinalEvaluationMarksSchema = new Schema({
  count: {
    type: Number,
    default: 0,
  },
  supervior_id: {
    type: String,
    default: '',
  },

  project_title: {
    type: String,
    default: '',
  },

  std1_name: {
    type: String,
    default: '',
  },
  std1_rollNo: {
    type: String,
    default: '',
  },
  std1_Relevance_Content: {
    type: [Number],
  },
  std1_Organization_and_Delivery: {
    type: [Number],
  },
  std1_Design_or_Layout: {
    type: [Number],
  },
  std1_Time_Management: {
    type: [Number],
  },
  std1_Questions_and_Answers: {
    type: [Number],
  },
  std1_weighted_average: {
    type: Number,
    default: 0,
  },
  std1_Relevance_Content_average: {
    type: Number,
    default: 0,
  },
  std1_Organization_and_Delivery_average: {
    type: Number,
    default: 0,
  },
  std1_Design_or_Layout_average: {
    type: Number,
    default: 0,
  },
  std1_Time_Management_average: {
    type: Number,
    default: 0,
  },
  std1_Questions_and_Answers_average: {
    type: Number,
    default: 0,
  },

  std2_name: {
    type: String,
    default: '',
  },
  std2_rollNo: {
    type: String,
    default: '',
  },
  std2_Relevance_Content: {
    type: [Number],
  },
  std2_Organization_and_Delivery: {
    type: [Number],
  },
  std2_Design_or_Layout: {
    type: [Number],
  },
  std2_Time_Management: {
    type: [Number],
  },
  std2_Questions_and_Answers: {
    type: [Number],
  },
  std2_weighted_average: {
    type: Number,
    default: 0,
  },
  std2_Relevance_Content_average: {
    type: Number,
    default: 0,
  },
  std2_Organization_and_Delivery_average: {
    type: Number,
    default: 0,
  },
  std2_Design_or_Layout_average: {
    type: Number,
    default: 0,
  },
  std2_Time_Management_average: {
    type: Number,
    default: 0,
  },
  std2_Questions_and_Answers_average: {
    type: Number,
    default: 0,
  },

  std3_name: {
    type: String,
    default: '',
  },
  std3_rollNo: {
    type: String,
    default: '',
  },
  std3_Relevance_Content: {
    type: [Number],
  },
  std3_Organization_and_Delivery: {
    type: [Number],
  },
  std3_Design_or_Layout: {
    type: [Number],
  },
  std3_Time_Management: {
    type: [Number],
  },
  std3_Questions_and_Answers: {
    type: [Number],
  },
  std3_weighted_average: {
    type: Number,
    default: 0,
  },
  std3_Relevance_Content_average: {
    type: Number,
    default: 0,
  },
  std3_Organization_and_Delivery_average: {
    type: Number,
    default: 0,
  },
  std3_Design_or_Layout_average: {
    type: Number,
    default: 0,
  },
  std3_Time_Management_average: {
    type: Number,
    default: 0,
  },
  std3_Questions_and_Answers_average: {
    type: Number,
    default: 0,
  },

  std4_name: {
    type: String,
    default: '',
  },
  std4_rollNo: {
    type: String,
    default: '',
  },
  std4_Relevance_Content: {
    type: [Number],
  },
  std4_Organization_and_Delivery: {
    type: [Number],
  },
  std4_Design_or_Layout: {
    type: [Number],
  },
  std4_Time_Management: {
    type: [Number],
  },
  std4_Questions_and_Answers: {
    type: [Number],
  },
  std4_weighted_average: {
    type: Number,
    default: 0,
  },
  std4_Relevance_Content_average: {
    type: Number,
    default: 0,
  },
  std4_Organization_and_Delivery_average: {
    type: Number,
    default: 0,
  },
  std4_Design_or_Layout_average: {
    type: Number,
    default: 0,
  },
  std4_Time_Management_average: {
    type: Number,
    default: 0,
  },
  std4_Questions_and_Answers_average: {
    type: Number,
    default: 0,
  },

  id: {
    type: Number,
    default: 0,
  },
  comment: {
    type: [String],
  },
  isPanelSubmitted: {
    type: Boolean,
    default: false,
    // assign a predefined false value
  },
});
