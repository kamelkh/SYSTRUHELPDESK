/* eslint-disable no-console */
import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../src/models/User";

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@systru.co.il";
  const adminPass = process.env.ADMIN_PASSWORD || "ChangeMe!123";
  const adminName = process.env.ADMIN_NAME || "System Admin";

  await mongoose.connect(uri);
  console.log("✓ Connected to MongoDB");

  const existing = await User.findOne({ email: adminEmail.toLowerCase() });
  if (existing) {
    console.log(`✓ Admin user already exists: ${adminEmail}`);
  } else {
    const passwordHash = await bcrypt.hash(adminPass, 12);
    await User.create({
      name: adminName,
      email: adminEmail.toLowerCase(),
      passwordHash,
      role: "ADMIN",
      active: true,
    });
    console.log(`✓ Created admin user: ${adminEmail} / ${adminPass}`);
    console.log("  ⚠ Change the password after first login");
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
