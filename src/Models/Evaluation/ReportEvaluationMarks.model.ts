import { Schema } from 'mongoose';
export interface ReportEvaluationMarks {
  project_title: string;
  count: number;
  supervior_id: number;

  std1_name: string;
  std1_rollNo: string;
  std1_Literature_Review: number[];
  std1_Methodology: number[];
  std1_Results_and_Discussion: number[];
  std1_Conclusions_and_Recommendations: number[];
  std1_Relevance_to_SDGs: number[];
  std1_Originality: number[];
  std1_Formatting_and_Organization: number[];
  std1_Technical_Writing: number[];
  std1_Literature_Review_average: number;
  std1_Methodology_average: number;
  std1_Results_and_Discussion_average: number;
  std1_Conclusions_and_Recommendations_average: number;
  std1_Relevance_to_SDGs_average: number;
  std1_Originality_average: number;
  std1_Formatting_and_Organization_average: number;
  std1_Technical_Writing_average: number;
  std1_weighted_average: number;

  std2_name: string;
  std2_rollNo: string;
  std2_Literature_Review: number[];
  std2_Methodology: number[];
  std2_Results_and_Discussion: number[];
  std2_Conclusions_and_Recommendations: number[];
  std2_Relevance_to_SDGs: number[];
  std2_Originality: number[];
  std2_Formatting_and_Organization: number[];
  std2_Technical_Writing: number[];
  std2_Literature_Review_average: number;
  std2_Methodology_average: number;
  std2_Results_and_Discussion_average: number;
  std2_Conclusions_and_Recommendations_average: number;
  std2_Relevance_to_SDGs_average: number;
  std2_Originality_average: number;
  std2_Formatting_and_Organization_average: number;
  std2_Technical_Writing_average: number;
  std2_weighted_average: number;

  std3_name: string;
  std3_rollNo: string;
  std3_Literature_Review: number[];
  std3_Methodology: number[];
  std3_Results_and_Discussion: number[];
  std3_Conclusions_and_Recommendations: number[];
  std3_Relevance_to_SDGs: number[];
  std3_Originality: number[];
  std3_Formatting_and_Organization: number[];
  std3_Technical_Writing: number[];
  std3_Literature_Review_average: number;
  std3_Methodology_average: number;
  std3_Results_and_Discussion_average: number;
  std3_Conclusions_and_Recommendations_average: number;
  std3_Relevance_to_SDGs_average: number;
  std3_Originality_average: number;
  std3_Formatting_and_Organization_average: number;
  std3_Technical_Writing_average: number;
  std3_weighted_average: number;

  std4_name: string;
  std4_rollNo: string;
  std4_Literature_Review: number[];
  std4_Methodology: number[];
  std4_Results_and_Discussion: number[];
  std4_Conclusions_and_Recommendations: number[];
  std4_Relevance_to_SDGs: number[];
  std4_Originality: number[];
  std4_Formatting_and_Organization: number[];
  std4_Technical_Writing: number[];
  std4_Literature_Review_average: number;
  std4_Methodology_average: number;
  std4_Results_and_Discussion_average: number;
  std4_Conclusions_and_Recommendations_average: number;
  std4_Relevance_to_SDGs_average: number;
  std4_Originality_average: number;
  std4_Formatting_and_Organization_average: number;
  std4_Technical_Writing_average: number;
  std4_weighted_average: number;
  id: number;
  isPanelSubmitted: boolean;
}
export const ReportEvaluationMarksSchema = new Schema({
  project_title: {
    type: String,
    default: '',
  },
  count: {
    type: Number,
    default: 0,
  },
  supervior_id: {
    type: Number,
    default: 0,
  },

  id: {
    type: Number,
    default: 0,
  },
  std1_name: {
    type: String,
    default: '',
  },
  std1_rollNo: {
    type: String,
    default: '',
  },
  std1_Literature_Review: {
    type: [Number],
  },
  std1_Methodology: {
    type: [Number],
  },
  std1_Results_and_Discussion: {
    type: [Number],
  },
  std1_Conclusions_and_Recommendations: {
    type: [Number],
  },
  std1_Relevance_to_SDGs: {
    type: [Number],
  },
  std1_Originality: {
    type: [Number],
  },
  std1_Formatting_and_Organization: {
    type: [Number],
  },
  std1_Technical_Writing: {
    type: [Number],
  },
  std1_Literature_Review_average: {
    type: Number,
    default: 0,
  },
  std1_Methodology_average: {
    type: Number,
    default: 0,
  },
  std1_Results_and_Discussion_average: {
    type: Number,
    default: 0,
  },
  std1_Conclusions_and_Recommendations_average: {
    type: Number,
    default: 0,
  },
  std1_Relevance_to_SDGs_average: {
    type: Number,
    default: 0,
  },
  std1_Originality_average: {
    type: Number,
    default: 0,
  },
  std1_Formatting_and_Organization_average: {
    type: Number,
    default: 0,
  },
  std1_Technical_Writing_average: {
    type: Number,
    default: 0,
  },
  std1_weighted_average: {
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
  std2_Literature_Review: {
    type: [Number],
  },
  std2_Methodology: {
    type: [Number],
  },
  std2_Results_and_Discussion: {
    type: [Number],
  },
  std2_Conclusions_and_Recommendations: {
    type: [Number],
  },
  std2_Relevance_to_SDGs: {
    type: [Number],
  },
  std2_Originality: {
    type: [Number],
  },
  std2_Formatting_and_Organization: {
    type: [Number],
  },
  std2_Technical_Writing: {
    type: [Number],
  },
  std2_Literature_Review_average: {
    type: Number,
    default: 0,
  },
  std2_Methodology_average: {
    type: Number,
    default: 0,
  },
  std2_Results_and_Discussion_average: {
    type: Number,
    default: 0,
  },
  std2_Conclusions_and_Recommendations_average: {
    type: Number,
    default: 0,
  },
  std2_Relevance_to_SDGs_average: {
    type: Number,
    default: 0,
  },
  std2_Originality_average: {
    type: Number,
    default: 0,
  },
  std2_Formatting_and_Organization_average: {
    type: Number,
    default: 0,
  },
  std2_Technical_Writing_average: {
    type: Number,
    default: 0,
  },
  std2_weighted_average: {
    type: Number,
    default: 0,
  },

  //

  std3_name: {
    type: String,
    default: '',
  },
  std3_rollNo: {
    type: String,
    default: '',
  },
  std3_Literature_Review: {
    type: [Number],
  },
  std3_Methodology: {
    type: [Number],
  },
  std3_Results_and_Discussion: {
    type: [Number],
  },
  std3_Conclusions_and_Recommendations: {
    type: [Number],
  },
  std3_Relevance_to_SDGs: {
    type: [Number],
  },
  std3_Originality: {
    type: [Number],
  },
  std3_Formatting_and_Organization: {
    type: [Number],
  },
  std3_Technical_Writing: {
    type: [Number],
  },
  std3_Literature_Review_average: {
    type: Number,
    default: 0,
  },
  std3_Methodology_average: {
    type: Number,
    default: 0,
  },
  std3_Results_and_Discussion_average: {
    type: Number,
    default: 0,
  },
  std3_Conclusions_and_Recommendations_average: {
    type: Number,
    default: 0,
  },
  std3_Relevance_to_SDGs_average: {
    type: Number,
    default: 0,
  },
  std3_Originality_average: {
    type: Number,
    default: 0,
  },
  std3_Formatting_and_Organization_average: {
    type: Number,
    default: 0,
  },
  std3_Technical_Writing_average: {
    type: Number,
    default: 0,
  },
  std3_weighted_average: {
    type: Number,
    default: 0,
  },

  //

  std4_name: {
    type: String,
    default: '',
  },
  std4_rollNo: {
    type: String,
    default: '',
  },
  std4_Literature_Review: {
    type: [Number],
  },
  std4_Methodology: {
    type: [Number],
  },
  std4_Results_and_Discussion: {
    type: [Number],
  },
  std4_Conclusions_and_Recommendations: {
    type: [Number],
  },
  std4_Relevance_to_SDGs: {
    type: [Number],
  },
  std4_Originality: {
    type: [Number],
  },
  std4_Formatting_and_Organization: {
    type: [Number],
  },
  std4_Technical_Writing: {
    type: [Number],
  },
  std4_Literature_Review_average: {
    type: Number,
    default: 0,
  },
  std4_Methodology_average: {
    type: Number,
    default: 0,
  },
  std4_Results_and_Discussion_average: {
    type: Number,
    default: 0,
  },
  std4_Conclusions_and_Recommendations_average: {
    type: Number,
    default: 0,
  },
  std4_Relevance_to_SDGs_average: {
    type: Number,
    default: 0,
  },
  std4_Originality_average: {
    type: Number,
    default: 0,
  },
  std4_Formatting_and_Organization_average: {
    type: Number,
    default: 0,
  },
  std4_Technical_Writing_average: {
    type: Number,
    default: 0,
  },
  std4_weighted_average: {
    type: Number,
    default: 0,
  },
  isPanelSubmitted: {
    type: Boolean,
    default: false,
    // assign a predefined false value
  },
});
