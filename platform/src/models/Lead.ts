import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type LeadSource =
  | "WEBSITE"
  | "DIAGNOSTIC"
  | "WHATSAPP"
  | "PHONE"
  | "EMAIL"
  | "REFERRAL"
  | "OTHER";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "QUALIFIED"
  | "PROPOSAL_SENT"
  | "NEGOTIATION"
  | "WON"
  | "LOST"
  | "ARCHIVED";

export interface ILead extends Document {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  source: LeadSource;
  status: LeadStatus;
  serviceInterest?: string[];
  message?: string;
  diagnosticAnswers?: Record<string, unknown>;
  diagnosticRecommendation?: string;
  assignedTo?: Types.ObjectId;
  notes?: { author: Types.ObjectId; body: string; createdAt: Date }[];
  convertedToCustomer?: Types.ObjectId;
  lostReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    fullName: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String, trim: true },
    source: {
      type: String,
      enum: ["WEBSITE", "DIAGNOSTIC", "WHATSAPP", "PHONE", "EMAIL", "REFERRAL", "OTHER"],
      default: "WEBSITE",
    },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "QUALIFIED", "PROPOSAL_SENT", "NEGOTIATION", "WON", "LOST", "ARCHIVED"],
      default: "NEW",
      index: true,
    },
    serviceInterest: [{ type: String }],
    message: { type: String },
    diagnosticAnswers: { type: Schema.Types.Mixed },
    diagnosticRecommendation: { type: String },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    notes: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        body: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    convertedToCustomer: { type: Schema.Types.ObjectId, ref: "Customer" },
    lostReason: { type: String },
  },
  { timestamps: true }
);

export const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);
