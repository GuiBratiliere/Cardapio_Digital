import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "i.pinimg.com",
      "drive.google.com", // adicione outros domínios se usar mais imagens externas
    ],
  },
};

export default nextConfig;
