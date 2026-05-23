import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type AssessmentType = "RISK_ASSESSMENT" | "DPO_AUDIT" | "CISO_GAP" | "ISO_27001";
export type AssessmentStatus = "DRAFT" | "IN_PROGRESS" | "REVIEW" | "COMPLETED" | "DELIVERED";

export interface IAssessmentFinding {
  category: string;
  control?: string;
  threat?: string;
  asset?: string;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  riskScore: number; // likelihood * impact
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  description: string;
  recommendation?: string;
  mitigationStatus?: "OPEN" | "IN_PROGRESS" | "MITIGATED" | "ACCEPTED";
  owner?: string;
  dueDate?: Date;
}

export interface IAssessment extends Document {
  assessmentNumber: string;
  type: AssessmentType;
  customer: Types.ObjectId;
  status: AssessmentStatus;
  scope?: string;
  methodology?: string;
  startDate?: Date;
  endDate?: Date;
  answers?: Record<string, unknown>;
  findings: IAssessmentFinding[];
  overallRiskScore?: number;
  executiveSummary?: string;
  recommendations?: string;
  reportPdfPath?: string;
  deliveredAt?: Date;
  deliveredViaEmailId?: string;
  performedBy: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const FindingSchema = new Schema<IAssessmentFinding>(
  {
    category: { type: String, required: true },
    control: String,
    threat: String,
    asset: String,
    likelihood: { type: Number, min: 1, max: 5, required: true },
    impact: { type: Number, min: 1, max: 5, required: true },
    riskScore: { type: Number, required: true },
    riskLevel: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      required: true,
    },
    description: { type: String, required: true },
    recommendation: String,
    mitigationStatus: {
      type: String,
      enum: ["OPEN", "IN_PROGRESS", "MITIGATED", "ACCEPTED"],
      default: "OPEN",
    },
    owner: String,
    dueDate: Date,
  },
  { _id: false }
);

const AssessmentSchema = new Schema<IAssessment>(
  {
    assessmentNumber: { type: String, required: true, unique: true, index: true },
    type: {
      type: String,
      enum: ["RISK_ASSESSMENT", "DPO_AUDIT", "CISO_GAP", "ISO_27001"],
      required: true,
      index: true,
    },
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true, index: true },
    status: {
      type: String,
      enum: ["DRAFT", "IN_PROGRESS", "REVIEW", "COMPLETED", "DELIVERED"],
      default: "DRAFT",
      index: true,
    },
    scope: String,
    methodology: String,
    startDate: Date,
    endDate: Date,
    answers: Schema.Types.Mixed,
    findings: { type: [FindingSchema], default: [] },
    overallRiskScore: Number,
    executiveSummary: String,
    recommendations: String,
    reportPdfPath: String,
    deliveredAt: Date,
    deliveredViaEmailId: String,
    performedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    reviewedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Assessment: Model<IAssessment> =
  mongoose.models.Assessment ||
  mongoose.model<IAssessment>("Assessment", AssessmentSchema);
