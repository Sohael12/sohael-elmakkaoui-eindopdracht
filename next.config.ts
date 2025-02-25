import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        domains: [
            "abblbyqaqa2f0hfu.public.blob.vercel-storage.com",
            "cdn.myanimelist.net", // Added MyAnimeList CDN
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
}

export default nextConfig

