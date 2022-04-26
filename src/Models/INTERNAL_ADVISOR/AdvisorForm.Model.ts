import { Schema } from 'mongoose';
export interface AdvisorForm {
  pending: [index: string];
  accepted: [index: string];
  rejected: [index: string];
  proposalPending: [index: string];
  proposalAccepted: [index: string];
  proposalRejected: [index: string];
  Attendance: [index: string];
}
export const AdvisorFormSchema = new Schema({
  pending: [String],
  accepted: [String],
  rejected: [String],
  proposalPending: [String],
  proposalAccepted: [String],
  proposalRejected: [String],
  Attendance: {
    type: [String],
    default: [],
  },
});
