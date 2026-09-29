import { RETIRED_PATHS } from './retired-paths.mjs';

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Thumbnails are fetched by the server and served from this domain, so visitors never contact YouTube.
    images: {
        remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/*/hqdefault.jpg' }]
    },
    async redirects() {
        return [
            // Enforce canonical host (www)
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'orionaimedia.com' }],
                destination: 'https://www.orionaimedia.com/:path*',
                permanent: true
            },
            // Retired agency-era pages land on the front door
            ...RETIRED_PATHS.map((source) => ({ source, destination: '/', permanent: true })),
            // The old per-page share images were replaced by one static image
            { source: '/og/:path*', destination: '/og.png', permanent: true }
        ];
    }
};

export default nextConfig;
