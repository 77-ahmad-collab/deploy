import { Schema } from 'mongoose';
export interface AdvisorForm {
  pending: [index: string];
  accepted: [index: string];
  rejected: [index: string];
}
export const AdvisorFormSchema = new Schema({
  pending: [String],
  accepted: [String],
  rejected: [String],
});
