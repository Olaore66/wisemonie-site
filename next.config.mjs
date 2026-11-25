/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  // The admin area is never cached, framed, indexed or sent as a referrer.
  async headers() {
    const admin = [
      { key: "Cache-Control", value: "no-store, max-age=0" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    return [
      { source: "/admin", headers: admin },
      { source: "/admin/:path*", headers: admin },
      { source: "/api/admin/:path*", headers: admin },
    ];
  },
  async redirects() {
    return [
      // The Terms page moved from /terms-of-service to /terms-of-use.
      { source: "/terms-of-service", destination: "/terms-of-use", permanent: true }
    ];
  }
};

export default nextConfig;
