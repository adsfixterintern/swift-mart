// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
//   reactCompiler: true,
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable React Compiler (Next 14+)
  reactCompiler: true,

  // ✅ Image Configuration (for external images)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co"
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org"
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  // ✅ Enable strict mode (recommended)
  reactStrictMode: true,

  // ✅ Experimental features (performance boost)
  experimental: {
    optimizeCss: true,
    scrollRestoration: true
  },

  // ✅ SWC minification (faster builds)
  swcMinify: true,

  // ✅ Disable X-Powered-By header (security)
  poweredByHeader: false
};

export default nextConfig;
