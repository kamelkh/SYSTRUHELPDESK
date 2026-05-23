import mongoose, { Schema, Document, Model } from "mongoose";

export type ServiceCategory =
  | "HELPDESK"
  | "MANAGED_IT"
  | "CYBER_SECURITY"
  | "CISO_AS_SERVICE"
  | "DPO_AS_SERVICE"
  | "RISK_ASSESSMENT"
  | "COMPLIANCE"
  | "CLOUD"
  | "INFRASTRUCTURE"
  | "OTHER";

export type BillingUnit = "MONTHLY" | "YEARLY" | "ONE_TIME" | "PER_HOUR" | "PER_USER";

export interface IServiceCatalog extends Document {
  code: string; // e.g. "CISO-RETAINER"
  name: string; // Hebrew
  nameEn?: string;
  category: ServiceCategory;
  description?: string;
  descriptionEn?: string;
  defaultPrice: number;
  currency: "ILS" | "USD" | "EUR";
  billingUnit: BillingUnit;
  active: boolean;
  features?: string[];
  scope?: string;
  sla?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceCatalogSchema = new Schema<IServiceCatalog>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    nameEn: String,
    category: {
      type: String,
      enum: [
        "HELPDESK",
        "MANAGED_IT",
        "CYBER_SECURITY",
        "CISO_AS_SERVICE",
        "DPO_AS_SERVICE",
        "RISK_ASSESSMENT",
        "COMPLIANCE",
        "CLOUD",
        "INFRASTRUCTURE",
        "OTHER",
      ],
      required: true,
      index: true,
    },
    description: String,
    descriptionEn: String,
    defaultPrice: { type: Number, required: true, min: 0 },
    currency: { type: String, enum: ["ILS", "USD", "EUR"], default: "ILS" },
    billingUnit: {
      type: String,
      enum: ["MONTHLY", "YEARLY", "ONE_TIME", "PER_HOUR", "PER_USER"],
      required: true,
    },
    active: { type: Boolean, default: true, index: true },
    features: [String],
    scope: String,
    sla: String,
  },
  { timestamps: true }
);

export const ServiceCatalog: Model<IServiceCatalog> =
  mongoose.models.ServiceCatalog ||
  mongoose.model<IServiceCatalog>("ServiceCatalog", ServiceCatalogSchema);
