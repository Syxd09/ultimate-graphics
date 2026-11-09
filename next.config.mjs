import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  async redirects() {
    return [
      {
        source: "/terms-of-service",
        destination: "/legal/terms-of-service",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/404",
        destination: "/",
        permanent: false,
      },
      {
        source: "/nomad-stays",
        destination: "/work/nomad-stays",
        permanent: true,
      },
      {
        source: "/box-mode",
        destination: "/work/box-mode",
        permanent: true,
      },
      {
        source: "/we-run-brand",
        destination: "/work/we-run-brand",
        permanent: true,
      },
      {
        source: "/stackline",
        destination: "/work/stackline",
        permanent: true,
      },
      {
        source: "/johny-nashville",
        destination: "/work/johny-nashville",
        permanent: true,
      },
      {
        source: "/blog/why-cheap-signage-fails-—-and-what-to-do-instead",
        destination: "/blog/architectural-signage-specifications-guide",
        permanent: true,
      },
      {
        source: "/blog/fleet-vehicle-branding-commercial-vans-and-trucks",
        destination: "/blog/commercial-fleet-branding-maintenance",
        permanent: true,
      },
      {
        source: "/blog/materials-guide-brass-stainless-steel-aluminum-signage",
        destination: "/blog/fiber-laser-vs-waterjet-metal-signage",
        permanent: true,
      },
      {
        source: "/blog/architectural-wayfinding-directional-signage-guide",
        destination: "/blog/architectural-signage-specifications-guide",
        permanent: true,
      },
      {
        source: "/architectural-wayfinding-directional-signage-guide",
        destination: "/blog/architectural-signage-specifications-guide",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
        ],
      },
      {
        // Media files (MP4/WebM) must not use disk caching and must support full Range and CORS
        // to prevent Chrome Chromium net::ERR_CACHE_OPERATION_NOT_SUPPORTED on media byte-range streaming requests
        source: "/assets/:file*.(mp4|webm)",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Range, Origin, Content-Type, Accept",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Range, Origin, Content-Type, Accept",
          },
        ],
      },
      {
        source: "/assets/ug-background-video.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Range, Origin, Content-Type, Accept",
          },
        ],
      },
      {
        source: "/assets/laser-cutting-hero.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Range, Origin, Content-Type, Accept",
          },
        ],
      },
      {
        source: "/assets/YUc1UMqfu6cFqEbpKpI1dpKqoes.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Range, Origin, Content-Type, Accept",
          },
        ],
      },
      {
        source: "/assets/Upkc3M9FymIbhcQFUfu8txagv8.mp4",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
          {
            key: "Accept-Ranges",
            value: "bytes",
          },
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, HEAD, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Range, Origin, Content-Type, Accept",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/sites/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
          {
            key: "Pragma",
            value: "no-cache",
          },
          {
            key: "Expires",
            value: "0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
