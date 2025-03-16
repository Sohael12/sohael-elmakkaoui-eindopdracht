import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "abblbyqaqa2f0hfu.public.blob.vercel-storage.com",
            "cdn.myanimelist.net", // Added MyAnimeList CDN
            "bnroxzhlqvzdroevywjw.supabase.co", // Add Supabase domain here
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
