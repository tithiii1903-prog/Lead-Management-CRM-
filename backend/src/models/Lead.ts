import mongoose, { Document, Schema } from 'mongoose';

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Converted' | 'Lost';

export interface ILead extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  companyName: string;
  leadStatus: LeadStatus;
  notes?: string;
  createdDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phoneNumber: { type: String, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    leadStatus: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'],
      default: 'New',
    },
    notes: { type: String, trim: true, default: '' },
    createdDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

leadSchema.index({ name: 'text', email: 'text', companyName: 'text' });

export const Lead = mongoose.model<ILead>('Lead', leadSchema);
