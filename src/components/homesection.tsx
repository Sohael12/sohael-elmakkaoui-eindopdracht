"use client";

import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Navbar from "@/components/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import animes from "@/lib/data";

export default function Homesection() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");

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
    }, [searchParams]);

    const filteredAnimes = animes.filter((anime) =>
        anime.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const topRatedAnime = animes.reduce((max, anime) => (anime.rating > max.rating ? anime : max), animes[0]);

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
            <Navbar />

            <main className="pt-20">
                {/* Uitgelichte anime sectie */}
                <section
                    className="relative w-full text-center py-24 flex flex-col items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${topRatedAnime.image}')` }}
                >
                    <div className="bg-black bg-opacity-60 p-10 rounded-2xl shadow-xl">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl font-extrabold text-yellow-400"
                        >
                            {topRatedAnime.title}
                        </motion.h1>
                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto text-lg">
                            {topRatedAnime.description || "Discover one of the best animes available now!"}
                        </p>
                        <Button
                            className="mt-6 bg-yellow-500 hover:bg-yellow-600 px-6 py-3 text-lg rounded-xl"
                            onClick={() => router.push(`/anime/${topRatedAnime.id}`)}
                        >
                            Watch Now
                        </Button>
                    </div>
                </section>

                {/* Anime browser sectie */}
                <section className="bg-gray-800 py-12 w-full">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-white mb-6">Browse Anime</h2>

                        {/* Zoekbalk met ShadCN UI */}
                        <div className="relative flex items-center w-full mb-6">
                            <Search className="absolute left-3 text-gray-400" size={20} />
                            <Input
                                id="search"
                                className="pl-10 pr-4 py-3 rounded-lg text-md border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-500"
                                placeholder="Search anime..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    handleSearch(e.target.value);
                                }}
                            />
                        </div>

                        {/* Anime lijst */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredAnimes.length > 0 ? (
                                filteredAnimes.map((anime) => (
                                    <motion.div key={anime.id} whileHover={{ scale: 1.05 }}>
                                        <Card className="bg-gray-700 rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl">
                                            <CardHeader className="relative">
                                                <Image
                                                    src={anime.image}
                                                    alt={anime.title}
                                                    className="w-full h-56 object-cover"
                                                    width={500}
                                                    height={200}
                                                    priority
                                                />
                                            </CardHeader>
                                            <CardContent className="p-5">
                                                <CardTitle className="text-white font-semibold text-xl">{anime.title}</CardTitle>
                                                <p className="text-gray-300 mt-2 text-md">⭐ {anime.rating?.toFixed(1) || "N/A"}</p>
                                            </CardContent>
                                            <CardFooter className="p-4">
                                                <Button
                                                    variant="ghost"
                                                    className="text-yellow-500 hover:text-yellow-400 w-full py-2 text-lg"
                                                    onClick={() => router.push(`/anime/${anime.id}`)}
                                                >
                                                    Watch Now
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center w-full">No anime found...</p>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
