'use client';

import type React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef } from "react";

export interface Anime {
    id: string; // UUID is een string
    title: string;
    image: string | null; // Image kan null zijn
    highlightVideo: string | null; // HighlightVideo kan null zijn
    fullEpisodeVideo: string | null; // FullEpisodeVideo kan null zijn
    rating: number | null; // Rating is een number of null
    genre: string | null; // Genre kan null zijn
    description: string | null; // Description kan null zijn
}

export interface AnimeSectionProps {
    title: string;
    animes: Anime[];
}

const AnimeSection: React.FC<AnimeSectionProps> = ({ title, animes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12"
        >
            <h2 className="text-3xl font-semibold text-[#FFD700] mb-6">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animes.map((anime) => (
                    <motion.div
                        key={anime.id}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <VideoPlayer anime={anime} />

                        <div className="mt-3 text-center">
                            <Link href={`/anime/${anime.id}`} className="block">
                                <span className="text-white text-lg font-semibold hover:text-[#FFD700] transition">
                                    {anime.title}
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

interface VideoPlayerProps {
    anime: Anime;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ anime }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener("loadeddata", () => {
                video.currentTime = 0.1;
            });
        }
    }, []);

    return (
        <video
            ref={videoRef}
            src={anime.highlightVideo || ""}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            poster={anime.image || "/path/to/default/image.png"}
            muted
            playsInline
            onMouseEnter={(e) => e.currentTarget.play()}
            onMouseLeave={(e) => e.currentTarget.pause()}
        />
    );
};

export default AnimeSection;