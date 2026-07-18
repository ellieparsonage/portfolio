import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Friendly entry points for the editor. Keystatic itself must live at
    // /keystatic, so these just forward there (the address bar ends on
    // /keystatic, which is fine).
    return [
      { source: "/ellieadmin", destination: "/keystatic", permanent: false },
    ];
  },
};

export default nextConfig;
