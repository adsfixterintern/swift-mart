// import createNextIntlPlugin from 'next-intl/plugin';

// const withNextIntl = createNextIntlPlugin();

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // ✅ Enable React Compiler (Next 14+)
//   reactCompiler: true,

//   // ✅ Image Configuration (for external images)
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "i.ibb.co"
//       },
//       {
//         protocol: "https",
//         hostname: "upload.wikimedia.org"
//       },
//     ],
//     formats: ["image/webp", "image/avif"],
//   },

//   // ✅ Enable strict mode (recommended)
//   reactStrictMode: true,

//   // ✅ Experimental features (performance boost)
//   experimental: {
//     scrollRestoration: true
//   },

//   // ✅ Disable X-Powered-By header (security)
//   poweredByHeader: false
// };

// // ✅ withNextIntl দিয়ে আপনার কনফিগকে র‍্যাপ (Wrap) করুন
// export default withNextIntl(nextConfig);

import createNextIntlPlugin from "next-intl/plugin";
import withPWAInit from "next-pwa";

const withNextIntl = createNextIntlPlugin();

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
    formats: ["image/webp", "image/avif"],
  },

  reactStrictMode: true,

  experimental: {
    scrollRestoration: true,
  },

  poweredByHeader: false,
};

// ✅ দুইটা plugin একসাথে wrap
export default withPWA(withNextIntl(nextConfig));
