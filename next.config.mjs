/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The Terms page moved from /terms-of-service to /terms-of-use.
      { source: "/terms-of-service", destination: "/terms-of-use", permanent: true }
    ];
  }
};

export default nextConfig;
