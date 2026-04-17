/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
};

export default nextConfig;
