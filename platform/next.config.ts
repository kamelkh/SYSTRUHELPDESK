import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "d3m9l0v76dty0.cloudfront.net" },
    ],
  },
  // Mongoose uses native Node modules; mark as server-only externals
  serverExternalPackages: ["mongoose", "bcryptjs"],
};

export default withNextIntl(nextConfig);

