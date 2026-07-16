import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/storage/:path*",
        destination: `${process.env.NEXT_PUBLIC_MINIO_INTERNAL_URL ?? "http://localhost:9000"}/portfolio/:path*`,
      },
    ];
  },
};

export default nextConfig;
