import type { NextConfig } from "next";

const RESIDENT_GUIDE_REDIRECTS = [
  "japan-phone-plans",
  "japan-living-cost",
  "japan-bank-account",
  "renting-apartment-japan",
  "part-time-jobs-japan",
] as const;

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  async redirects() {
    return RESIDENT_GUIDE_REDIRECTS.map((slug) => ({
      source: `/guides/${slug}`,
      destination: `/residents/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
