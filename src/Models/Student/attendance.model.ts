import { Schema } from 'mongoose';
export interface Attendance {
  week: any[];
  count: number;
}
export const AttendanceSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
    // required: true,
  },
  week: {
    type: [],
  },
});
