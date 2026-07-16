import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: `${process.env.MINIO_INTERNAL_URL ?? "http://localhost:9000"}/portfolio-files/:path*`,
      },
    ];
  },
};

export default nextConfig;
