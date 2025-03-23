"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Anime = {
    description: string;
    id: string;
    title: string;
    image: string | null;
    highlightVideo: string | null;
    fullEpisodeVideo: string | null;
    rating: string | null;
    genre: string | null;
};

interface AnimeCarouselProps {
    animes: Anime[];
    title?: string;
}

export function AnimeCarousel({ animes, title = "Featured Animes" }: AnimeCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const featuredAnimes = animes.slice(0, Math.min(5, animes.length));

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === featuredAnimes.length - 1 ? 0 : prevIndex + 1
        );
    }, [featuredAnimes.length]);

    const prevSlide = useCallback(() => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? featuredAnimes.length - 1 : prevIndex - 1
        );
    }, [featuredAnimes.length]);

    useEffect(() => {
        if (!isHovering) {
            const interval = setInterval(() => {
                nextSlide();
            }, 5000);

            return () => clearInterval(interval);
        }
    }, [isHovering, nextSlide]);

    if (animes.length === 0) return null;

    return (
        <div
            className="relative overflow-hidden rounded-2xl"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                    {title}
                </h2>
            </div>

            <div className="relative h-[50vh] md:h-[60vh] w-full">
                {featuredAnimes.map((anime, index) => (
                    <div
                        key={anime.id}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-1000",
                            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        )}
                    >
                        <div className="relative h-full w-full">
                            <Image
                                src={anime.image || "/placeholder.svg?height=1080&width=1920"}
                                alt={anime.title}
                                fill
                                className="object-cover rounded-xl"
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
                                <div className="flex items-center space-x-2 mb-3">
                                    <div className="bg-purple-600 text-xs font-medium px-2.5 py-0.5 rounded">
                                        Featured
                                    </div>
                                    {anime.genre && (
                                        <div className="bg-white/10 text-xs font-medium px-2.5 py-0.5 rounded">
                                            {anime.genre}
                                        </div>
                                    )}
                                    {anime.rating && (
                                        <div className="bg-black/60 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
                                            <Star className="text-yellow-400 fill-yellow-400 mr-1 h-3 w-3" />
                                            <span>{anime.rating}</span>
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-2xl md:text-4xl font-bold mb-2 text-white drop-shadow-lg">
                                    {anime.title}
                                </h3>

                                {anime.description && (
                                    <p className="text-gray-200 mb-6 max-w-2xl line-clamp-2 md:line-clamp-3">
                                        {anime.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-3">
                                    <Link href={`/anime/${anime.id}`}>
                                        <Button className="bg-purple-600 hover:bg-purple-700">
                                            <Play className="mr-2 h-4 w-4" /> Watch now
                                        </Button>
                                    </Link>
                                    <Link href={`/anime/${anime.id}`}>
                                        <Button variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                                            More info
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    aria-label="Next slide"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
                    {featuredAnimes.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={cn(
                                "w-2.5 h-2.5 rounded-full transition-all",
                                index === currentIndex
                                    ? "bg-white scale-110"
                                    : "bg-white/40 hover:bg-white/60"
                            )}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
