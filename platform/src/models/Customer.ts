import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ICustomer extends Document {
  companyName: string;
  contactName: string;
  email: string;
  phone?: string;
  taxId?: string; // ח.פ / ע.מ
  address?: {
    street?: string;
    city?: string;
    country?: string;
    zip?: string;
  };
  industry?: string;
  employeeCount?: number;
  activeServices?: string[];
  accountManager?: Types.ObjectId;
  status: "ACTIVE" | "INACTIVE" | "CHURNED";
  fromLead?: Types.ObjectId;
  notes?: { author: Types.ObjectId; body: string; createdAt: Date }[];
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    companyName: { type: String, required: true, trim: true, index: true },
    contactName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String },
    taxId: { type: String, trim: true, index: true },
    address: {
      street: String,
      city: String,
      country: { type: String, default: "Israel" },
      zip: String,
    },
    industry: String,
    employeeCount: Number,
    activeServices: [String],
    accountManager: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE", "CHURNED"],
      default: "ACTIVE",
      index: true,
    },
    fromLead: { type: Schema.Types.ObjectId, ref: "Lead" },
    notes: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        body: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const Customer: Model<ICustomer> =
  mongoose.models.Customer || mongoose.model<ICustomer>("Customer", CustomerSchema);
