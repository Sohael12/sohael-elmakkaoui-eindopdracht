"use client";

import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Navbar from "@/components/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Search, Play, Star, ChevronRight, ChevronLeft, Filter, TrendingUp } from 'lucide-react';
import animes from "@/lib/data";
import { Badge } from "@/components/ui/badge";

export default function Homesection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);

    // Extract all unique genres from anime data
    const allGenres = Array.from(
        new Set(
            animes.flatMap(anime =>
                Array.isArray(anime.genre) ? anime.genre : [anime.genre]
            ).filter(Boolean)
        )
    );

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        const urlQuery = searchParams.get("query") || "";
        if (urlQuery !== searchQuery) {
            setSearchQuery(urlQuery);
        }
    }, [searchParams, searchQuery]);

    // Filter animes based on search query and selected genre
    const filteredAnimes = animes.filter((anime) => {
        const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenre
            ? Array.isArray(anime.genre)
                ? anime.genre.includes(selectedGenre)
                : anime.genre === selectedGenre
            : true;
        return matchesSearch && matchesGenre;
    });

    // Get top rated animes
    const topRatedAnimes = [...animes].sort((a, b) => b.rating - a.rating).slice(0, 5);

    // Autoplay for hero carousel
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % topRatedAnimes.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [autoplay, topRatedAnimes.length]);

    // Scroll carousel
    const scrollCarousel = (direction: 'left' | 'right') => {
        if (!carouselRef.current) return;

        const scrollAmount = direction === 'left'
            ? -carouselRef.current.offsetWidth * 0.8
            : carouselRef.current.offsetWidth * 0.8;

        carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#0A0A1B] text-white min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-16">
                {/* Hero Carousel Section */}
                <section className="relative h-[80vh] overflow-hidden">
                    {/* Background gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A1B]/20 via-[#0A0A1B]/50 to-[#0A0A1B] z-10"></div>

                    {/* Carousel */}
                    <div className="relative h-full">
                        <AnimatePresence initial={false}>
                            {topRatedAnimes.map((anime, index) => (
                                index === activeIndex && (
                                    <motion.div
                                        key={anime.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1 }}
                                        className="absolute inset-0"
                                    >
                                        <div className="relative h-full w-full">
                                            <Image
                                                src={anime.image || "/placeholder.svg"}
                                                alt={anime.title}
                                                fill
                                                className="object-cover"
                                                priority
                                            />
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>

                        {/* Content overlay */}
                        <div className="absolute inset-0 z-20 flex items-center">
                            <div className="container mx-auto px-6">
                                <div className="max-w-2xl">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2, duration: 0.8 }}
                                    >
                                        <Badge className="bg-purple-600 mb-4">
                                            {Array.isArray(topRatedAnimes[activeIndex].genre)
                                                ? topRatedAnimes[activeIndex].genre[0]
                                                : topRatedAnimes[activeIndex].genre}
                                        </Badge>

                                        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white drop-shadow-lg">
                                            {topRatedAnimes[activeIndex].title}
                                        </h1>

                                        <div className="flex items-center mb-4">
                                            <div className="flex items-center mr-4">
                                                <Star className="text-yellow-400 fill-yellow-400 mr-1 h-5 w-5" />
                                                <span className="font-medium">{topRatedAnimes[activeIndex].rating.toFixed(1)}</span>
                                            </div>
                                        </div>

                                        <p className="text-gray-200 text-lg mb-6 line-clamp-3">
                                            {topRatedAnimes[activeIndex].description}
                                        </p>

                                        <div className="flex space-x-4">
                                            <Button
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6"
                                                onClick={() => router.push(`/anime/${topRatedAnimes[activeIndex].id}`)}
                                            >
                                                <Play className="mr-2 h-5 w-5" /> Watch Now
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border-white/20 bg-black/30 backdrop-blur-sm text-white hover:bg-white/10 px-8 py-6"
                                                onClick={() => router.push(`/anime/${topRatedAnimes[activeIndex].id}`)}
                                            >
                                                More Info
                                            </Button>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Carousel controls */}
                        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
                            {topRatedAnimes.map((_, index) => (
                                <button
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        index === activeIndex ? "bg-white w-10" : "bg-white/50"
                                    }`}
                                    onClick={() => {
                                        setActiveIndex(index);
                                        setAutoplay(false);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Search and Filter Section */}
                <section className="py-12 container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            Discover Anime
                        </h2>

                        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                <Input
                                    id="search"
                                    className="pl-10 pr-4 py-2 rounded-full text-sm border-none bg-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 w-full"
                                    placeholder="Search anime..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        handleSearch(e.target.value);
                                    }}
                                />
                            </div>

                            <div className="relative group">
                                <Button
                                    variant="outline"
                                    className="border-white/20 bg-white/10 text-white hover:bg-white/20 rounded-full flex items-center gap-2"
                                >
                                    <Filter size={16} />
                                    {selectedGenre || "All Genres"}
                                </Button>

                                <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A1A2E] rounded-lg shadow-xl overflow-hidden z-50 hidden group-hover:block">
                                    <div className="p-2">
                                        <button
                                            className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                                                selectedGenre === null ? "bg-purple-600 text-white" : "hover:bg-white/10"
                                            }`}
                                            onClick={() => setSelectedGenre(null)}
                                        >
                                            All Genres
                                        </button>
                                        {allGenres.map((genre) => (
                                            <button
                                                key={genre}
                                                className={`w-full text-left px-4 py-2 text-sm rounded-md ${
                                                    selectedGenre === genre ? "bg-purple-600 text-white" : "hover:bg-white/10"
                                                }`}
                                                onClick={() => setSelectedGenre(genre)}
                                            >
                                                {genre}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trending Section with Horizontal Scroll */}
                    <div className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Trending Now</h3>
                            </div>

                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                                    onClick={() => scrollCarousel('left')}
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20"
                                    onClick={() => scrollCarousel('right')}
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        <div
                            ref={carouselRef}
                            className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {animes.slice(0, 10).map((anime) => (
                                <div
                                    key={anime.id}
                                    className="flex-shrink-0 w-[280px] snap-start"
                                    onClick={() => router.push(`/anime/${anime.id}`)}
                                >
                                    <motion.div
                                        whileHover={{ y: -10 }}
                                        className="cursor-pointer"
                                    >
                                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-3">
                                            <Image
                                                src={anime.image || "/placeholder.svg"}
                                                alt={anime.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <Button
                                                    className="bg-purple-600 hover:bg-purple-700 rounded-full w-12 h-12 p-0 flex items-center justify-center"
                                                >
                                                    <Play className="h-5 w-5" />
                                                </Button>
                                            </div>
                                            <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 flex items-center">
                                                <Star className="text-yellow-400 fill-yellow-400 mr-1 h-3 w-3" />
                                                <span className="text-xs font-medium">{anime.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <h4 className="font-semibold text-white line-clamp-1">{anime.title}</h4>
                                        <p className="text-xs text-gray-400">
                                            {Array.isArray(anime.genre) ? anime.genre.join(', ') : anime.genre}
                                        </p>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Main Anime Grid */}
                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">Browse All Anime</h3>

                        {filteredAnimes.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {filteredAnimes.map((anime) => (
                                    <motion.div
                                        key={anime.id}
                                        whileHover={{ scale: 1.05 }}
                                        className="cursor-pointer"
                                        onClick={() => router.push(`/anime/${anime.id}`)}
                                    >
                                        <Card className="bg-[#1A1A2E] border-none rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/20">
                                            <CardHeader className="p-0">
                                                <div className="relative aspect-[2/3]">
                                                    <Image
                                                        src={anime.image || "/placeholder.svg"}
                                                        alt={anime.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent"></div>
                                                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 flex items-center">
                                                        <Star className="text-yellow-400 fill-yellow-400 mr-1 h-3 w-3" />
                                                        <span className="text-xs font-medium">{anime.rating.toFixed(1)}</span>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <CardTitle className="text-white text-base font-medium line-clamp-1 mb-1">
                                                    {anime.title}
                                                </CardTitle>
                                                <p className="text-xs text-gray-400 line-clamp-1">
                                                    {Array.isArray(anime.genre) ? anime.genre.join(', ') : anime.genre}
                                                </p>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full bg-white/5 hover:bg-white/10 text-white"
                                                >
                                                    <Play className="mr-2 h-4 w-4" /> Watch Now
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="bg-white/5 rounded-full p-6 mb-4">
                                    <Search className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">No anime found</h3>
                                <p className="text-gray-400 max-w-md">
                                    We couldn't find any anime matching your search criteria. Try adjusting your filters or search term.
                                </p>
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
