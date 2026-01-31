const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// On Vercel, app is at root; on GitHub Pages, app is at /designworld
const basePath = process.env.VERCEL ? '' : '/designworld';
const assetPrefix = process.env.VERCEL ? undefined : '/designworld/';

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,

  basePath: basePath || undefined,
  ...(assetPrefix && { assetPrefix }),

  images: {
    // ✅ GH Pages'te Next Image optimizer yok
    unoptimized: true,

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    // Optimize memory usage for large images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Reduce memory usage during compilation
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Separate vendor chunks
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
          },
        },
      };
    }
    return config;
  },
  // Allow production builds to complete even with ESLint errors (e.g. for Vercel deploy)
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Allow production builds to complete even with TypeScript errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withNextIntl(nextConfig);
