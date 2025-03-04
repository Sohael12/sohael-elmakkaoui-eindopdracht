'use client';

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, Play, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

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

interface VideoPlayerProps {
    anime: Anime;
}
export interface AnimeSectionProps {
    title: string;
    animes: Anime[];
}

const AnimeSection: React.FC<AnimeSectionProps> = ({ title, animes }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-8 px-4 md:px-8"
        >
            <div className="flex items-center justify-between">
                <motion.h2
                    initial={{ x: -20 }}
                    animate={{ x: 0 }}
                    className="text-4xl font-bold bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent"
                >
                    {title}
                </motion.h2>
                <Button variant="ghost" className="text-[#FFD700] hover:bg-white/10">
                    View All <span className="ml-2">→</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                {animes.map((anime, index) => (
                    <motion.div
                        key={anime.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="h-full bg-black/40 backdrop-blur-lg border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all group">
                            <CardHeader className="relative p-0 overflow-hidden rounded-t-lg">
                                <VideoPlayer anime={anime} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                                <div className="absolute bottom-4 left-4 right-4 space-y-2">
                                    <div className="flex items-center gap-2">
                                        {anime.genre && (
                                            <span className="px-3 py-1 text-xs font-bold bg-[#FFD700] text-black rounded-full">
                        {anime.genre}
                      </span>
                                        )}
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-4 space-y-3">
                                <CardTitle className="text-xl font-bold text-white line-clamp-1">
                                    {anime.title}
                                </CardTitle>

                                <div className="flex items-center gap-2">
                                    <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
                                    <span className="text-sm text-white/80">
                    {anime.rating?.toFixed(1) || 'N/A'}
                  </span>
                                </div>
                            </CardContent>

                            <CardFooter className="p-4 pt-0">
                                <Link href={`/anime/${anime.id}`} className="w-full">
                                    <Button className="w-full bg-[#FFD700] hover:bg-[#FFA500] text-black font-bold">
                                        <Play className="mr-2" /> Watch Now
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ anime }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateProgress = () => {
            setProgress((video.currentTime / video.duration) * 100);
        };

        video.addEventListener('timeupdate', updateProgress);
        return () => video.removeEventListener('timeupdate', updateProgress);
    }, []);

    return (
        <div
            className="relative h-64 w-full"
            onMouseEnter={() => {
                setIsHovered(true);
                videoRef.current?.play();
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                videoRef.current?.pause();
            }}
        >
            <video
                ref={videoRef}
                src={anime.highlightVideo || ''}
                className="h-full w-full object-cover"
                poster={anime.image || '/default-anime.jpg'}
                muted
                playsInline
            />

            {!anime.highlightVideo && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center">
                    <Play className="w-16 h-16 text-black" />
                </div>
            )}

            <Progress
                value={progress}
                className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-none"
            />

            {isHovered && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                    <Button
                        variant="ghost"
                        size="lg"
                        className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                    >
                        <Play className="w-8 h-8 text-[#FFD700]" fill="#FFD700" />
                    </Button>
                </motion.div>
            )}
        </div>
    );
};

export default AnimeSection;