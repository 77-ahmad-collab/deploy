import { Schema } from 'mongoose';
export interface EvaluationMarks {
  std1_Literature_Review: number[];
  std1_Methodology: number[];
  std1_Adherence_to_Work_Plan: number[];
  std1_Reporting_and_Presentation: number[];
  std1_Literature_Review_average: number;
  std1_Methodology_average: number;
  std1_Adherence_to_Work_Plan_average: number;
  std1_Reporting_and_Presentation_average: number;
  std1_weighted_average: number;
  std2_Literature_Review: number[];
  std2_Methodology: number[];
  std2_Adherence_to_Work_Plan: number[];
  std2_Reporting_and_Presentation: number[];
  std2_Literature_Review_average: number;
  std2_Methodology_average: number;
  std2_Adherence_to_Work_Plan_average: number;
  std2_Reporting_and_Presentation_average: number;
  std2_weighted_average: number;
  std3_Literature_Review: number[];
  std3_Methodology: number[];
  std3_Adherence_to_Work_Plan: number[];
  std3_Reporting_and_Presentation: number[];
  std3_Literature_Review_average: number;
  std3_Methodology_average: number;
  std3_Adherence_to_Work_Plan_average: number;
  std3_Reporting_and_Presentation_average: number;
  std3_weighted_average: number;
  std4_Literature_Review: number[];
  std4_Methodology: number[];
  std4_Adherence_to_Work_Plan: number[];
  std4_Reporting_and_Presentation: number[];
  std4_Literature_Review_average: number;
  std4_Methodology_average: number;
  std4_Adherence_to_Work_Plan_average: number;
  std4_Reporting_and_Presentation_average: number;
  std4_weighted_average: number;
  count: number;
  project_title: string;
}
export const EvaluationMarksSchema = new Schema({
  std1_Literature_Review: {
    type: [Number],
  },
  std1_Methodology: {
    type: [Number],
  },
  std1_Adherence_to_Work_Plan: {
    type: [Number],
  },
  std1_Reporting_and_Presentation: {
    type: [Number],
  },
  std1_literature_review_averageMarks: {
    type: Number,
  },
  std1_Methodology_average: {
    type: Number,
  },
  std1_Adherence_to_Work_Plan_average: {
    type: Number,
  },
  std1_Reporting_and_Presentation_average: {
    type: Number,
  },
  std1_weighted_average: {
    type: Number,
  },
  std2_Literature_Review: {
    type: [Number],
  },
  std2_Methodology: {
    type: [Number],
  },
  std2_Adherence_to_Work_Plan: {
    type: [Number],
  },
  std2_Reporting_and_Presentation: {
    type: [Number],
  },
  std2_Literature_Review_average: {
    type: Number,
  },
  std2_Methodology_average: {
    type: Number,
  },
  std2_Adherence_to_Work_Plan_average: {
    type: Number,
  },
  std2_Reporting_and_Presentation_average: {
    type: Number,
  },
  std2_weighted_average: {
    type: Number,
  },
  std3_Literature_Review: {
    type: [Number],
  },
  std3_Methodology: {
    type: [Number],
  },
  std3_Adherence_to_Work_Plan: {
    type: [Number],
  },
  std3_Reporting_and_Presentation: {
    type: [Number],
  },
  std3_Literature_Review_average: {
    type: Number,
  },
  std3_Methodology_average: {
    type: Number,
  },
  std3_Adherence_to_Work_Plan_average: {
    type: Number,
  },
  std3_Reporting_and_Presentation_average: {
    type: Number,
  },
  std3_weighted_average: {
    type: Number,
  },
  std4_Literature_Review: {
    type: [Number],
  },
  std4_Methodology: {
    type: [Number],
  },
  std4_Adherence_to_Work_Plan: {
    type: [Number],
  },
  std4_Reporting_and_Presentation: {
    type: [Number],
  },
  std4_Literature_Review_average: {
    type: Number,
  },
  std4_Methodology_average: {
    type: Number,
  },
  std4_Adherence_to_Work_Plan_average: {
    type: Number,
  },
  std4_Reporting_and_Presentation_average: {
    type: Number,
  },
  std4_weighted_average: {
    type: Number,
  },
  count: {
    type: Number,
  },
  project_title: {
    type: String,
    trim: true,
  },
});
