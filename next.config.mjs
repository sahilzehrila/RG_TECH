/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 's.thum.io',
      },
    ],
  },
  // Optimization: Compress assets
  compress: true,
  // Optimization: Production browser sourcemaps
  productionBrowserSourceMaps: false,
  // Optimize package imports for tree-shaking icon & animation bundles
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'three', '@react-three/drei'],
  },
};

export default nextConfig;
