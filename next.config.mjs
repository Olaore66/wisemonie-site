/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      // The Terms page moved from /terms-of-service to /terms-of-use.
      { source: "/terms-of-service", destination: "/terms-of-use", permanent: true }
    ];
  }
};

export default nextConfig;
