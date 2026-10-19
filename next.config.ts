import path from "path";
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Next injects polyfill-module into the framework chunk regardless of
// browserslist. Alias it to a URL.canParse-only stub. Re-check this path
// after upgrading Next.
const polyfillStub = "./lib/modern-polyfill.js";

const nextConfig: NextConfig = {
  experimental: {
    // Production only. Inlines the Tailwind sheet so the first paint does not
    // wait on a render-blocking stylesheet request.
    inlineCss: true,
  },
  images: {
    // In local dev, Strapi runs on localhost (a private/loopback IP). Next.js's
    // image optimisation proxy blocks requests to private IPs as an SSRF guard,
    // so we bypass optimisation entirely in dev and serve images directly.
    // In production the Strapi URL is a public Railway hostname, so optimisation
    // is enabled and `remotePatterns` is used normally.
    unoptimized: isDev,
    remotePatterns: [
      // Strapi on Railway (production)
      {
        protocol: "https",
        hostname: "**.up.railway.app",
        pathname: "/uploads/**",
      },
      // Strapi local dev — kept so TypeScript types resolve correctly
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": polyfillStub,
      "next/dist/build/polyfills/polyfill-module": polyfillStub,
    },
  },
  webpack(config) {
    const alias = config.resolve?.alias;
    config.resolve ??= {};
    config.resolve.alias = {
      ...(alias && !Array.isArray(alias) ? alias : {}),
      "../build/polyfills/polyfill-module": path.join(process.cwd(), polyfillStub),
      "next/dist/build/polyfills/polyfill-module": path.join(
        process.cwd(),
        polyfillStub,
      ),
    };
    return config;
  },
};

export default nextConfig;
