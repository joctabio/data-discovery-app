import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    JSON_SERVER_ENDPOINT: "http://localhost:8080"
  }
};

export default nextConfig;
