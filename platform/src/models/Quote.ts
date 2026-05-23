import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type QuoteStatus =
  | "DRAFT"
  | "SENT"
  | "VIEWED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "REVISED";

export interface IQuoteLine {
  serviceCode?: string;
  description: string;
  quantity: number;
  unitPrice: number;
  discountPct?: number;
  billingUnit: "MONTHLY" | "YEARLY" | "ONE_TIME" | "PER_HOUR" | "PER_USER";
  lineTotal: number;
}

export interface IQuote extends Document {
  quoteNumber: string; // SYSTRU-Q-2025-0001
  customer?: Types.ObjectId;
  lead?: Types.ObjectId;
  recipientName: string;
  recipientEmail: string;
  recipientCompany?: string;
  language: "he" | "en";
  status: QuoteStatus;
  lines: IQuoteLine[];
  subtotal: number;
  vatPct: number;
  vatAmount: number;
  total: number;
  currency: "ILS" | "USD" | "EUR";
  validUntil: Date;
  introNote?: string;
  termsAndConditions?: string;
  pdfPath?: string;
  emailSentAt?: Date;
  emailMessageId?: string;
  acceptedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteLineSchema = new Schema<IQuoteLine>(
  {
    serviceCode: String,
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    unitPrice: { type: Number, required: true, min: 0 },
    discountPct: { type: Number, default: 0, min: 0, max: 100 },
    billingUnit: {
      type: String,
      enum: ["MONTHLY", "YEARLY", "ONE_TIME", "PER_HOUR", "PER_USER"],
      required: true,
    },
    lineTotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const QuoteSchema = new Schema<IQuote>(
  {
    quoteNumber: { type: String, required: true, unique: true, index: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    lead: { type: Schema.Types.ObjectId, ref: "Lead" },
    recipientName: { type: String, required: true },
    recipientEmail: { type: String, required: true, lowercase: true },
    recipientCompany: String,
    language: { type: String, enum: ["he", "en"], default: "he" },
    status: {
      type: String,
      enum: ["DRAFT", "SENT", "VIEWED", "ACCEPTED", "REJECTED", "EXPIRED", "REVISED"],
      default: "DRAFT",
      index: true,
    },
    lines: { type: [QuoteLineSchema], default: [] },
    subtotal: { type: Number, required: true, default: 0 },
    vatPct: { type: Number, default: 18 },
    vatAmount: { type: Number, default: 0 },
    total: { type: Number, required: true, default: 0 },
    currency: { type: String, enum: ["ILS", "USD", "EUR"], default: "ILS" },
    validUntil: { type: Date, required: true },
    introNote: String,
    termsAndConditions: String,
    pdfPath: String,
    emailSentAt: Date,
    emailMessageId: String,
    acceptedAt: Date,
    rejectedAt: Date,
    rejectionReason: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Quote: Model<IQuote> =
  mongoose.models.Quote || mongoose.model<IQuote>("Quote", QuoteSchema);
