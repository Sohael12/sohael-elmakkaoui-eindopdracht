"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";


interface Manga {
    mal_id: number;
    images: {
        webp: {
            image_url: string;
        };
    };
    title: string;
    title_japanese: string;
    synopsis: string;
    favorites: number;
    chapters?: number;
    volumes?: number;
    score?: number;
}

interface MangaSectionProps {
    title: string;
}

export default function MangaSection({ title }: MangaSectionProps) {
    const [mangaList, setMangaList] = useState<Manga[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const router = useRouter();

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await fetch("https://api.jikan.moe/v4/manga");
                const data = await response.json();
                setMangaList(data.data);
            } catch (err) {
                setError("Failed to load manga");
            } finally {
                setIsLoading(false);
            }
        };

        fetchManga();
    }, []);

    const filteredManga = mangaList.filter((manga) => {
        const matchesSearch =
            manga.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            manga.title_japanese?.includes(searchTerm);

        if (selectedFilter === "all") return matchesSearch;
        if (selectedFilter === "popular") return matchesSearch && manga.favorites > 1000;
        return matchesSearch;
    });

    if (error) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg">{error}</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className="bg-gradient-to-b from-gray-900 to-black py-12">
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="container mx-auto px-6 space-y-8"
                >
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-bold text-yellow-400">{title}</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Browse and discover your favorite manga series. Click on any manga to start reading.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                        <div className="relative w-full max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search manga..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <select
                                value={selectedFilter}
                                onChange={(e) => setSelectedFilter(e.target.value)}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                            >
                                <option value="all">All Manga</option>
                                <option value="popular">Popular</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {isLoading
                            ? [...Array(8)].map((_, index) => (
                                <div key={index} className="rounded-lg overflow-hidden bg-gray-800/50">
                                    <div className="h-[300px] bg-gray-700/50 animate-pulse" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-6 bg-gray-700/50 rounded w-2/3 animate-pulse" />
                                        <div className="h-4 bg-gray-700/50 rounded w-1/2 animate-pulse" />
                                    </div>
                                </div>
                            ))
                            : filteredManga.map((manga) => (
                                <motion.div
                                    key={manga.mal_id}
                                    whileHover={{ y: -4 }}
                                    transition={{ duration: 0.2 }}
                                    className="group cursor-pointer"
                                    onClick={() => router.push(`/manga/${manga.mal_id}`)}
                                >
                                    <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
                                        <div className="relative h-[300px] overflow-hidden">
                                            <Image
                                                src={manga.images.webp.image_url || "/placeholder.svg"}
                                                alt={manga.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                priority={manga.mal_id <= 4}
                                            />
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <h3 className="text-lg font-semibold text-white truncate">{manga.title}</h3>
                                            {manga.title_japanese && <p className="text-sm text-gray-400">{manga.title_japanese}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </div>
                </motion.section>
            </div>
            <Footer />
        </div>
    );
}
