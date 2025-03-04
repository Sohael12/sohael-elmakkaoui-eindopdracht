'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from "@/components/navigation";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { motion } from "framer-motion";
import animes from "@/lib/data";

export default function Homesection() {
    const router = useRouter();

    // Selecteer de best beoordeelde anime
    const topRatedAnime = animes.reduce((max, anime) => (anime.rating > max.rating ? anime : max), animes[0]);

    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
            <Navbar />

            <main className="pt-20">
                <section
                    className="relative w-full text-center py-24 flex flex-col items-center justify-center bg-cover bg-center"
                    style={{ backgroundImage: `url('${topRatedAnime.image}')` }}
                >
                    <div className="bg-black bg-opacity-60 p-10 rounded-lg shadow-lg">
                        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl font-extrabold text-yellow-400">
                            {topRatedAnime.title}
                        </motion.h1>
                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                            {topRatedAnime.description || "Discover one of the best animes available now!"}
                        </p>
                        <Button className="mt-6 bg-yellow-500 hover:bg-yellow-600" onClick={() => router.push(`/anime/${topRatedAnime.id}`)}>
                            Watch Now
                        </Button>
                    </div>
                </section>

                <section className="bg-gray-800 py-12 w-full">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-white mb-6">Browse Anime</h2>

                        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                            {['Genre', 'Sort By', 'Year', 'Rating'].map((filter, index) => (
                                <Select key={index}>
                                    <SelectTrigger className="bg-gray-700 text-white px-4 py-2 rounded-md">{filter}</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All {filter}</SelectItem>
                                    </SelectContent>
                                </Select>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {animes.map((anime) => (
                                <motion.div key={anime.id} whileHover={{ scale: 1.05 }}>
                                    <Card className="bg-gray-700 rounded-lg shadow-lg overflow-hidden">
                                        <CardHeader className="relative">
                                            <Image
                                                src={anime.image}
                                                alt={anime.title}
                                                className="w-full h-52 object-cover"
                                                width={500}
                                                height={200}
                                            />
                                        </CardHeader>
                                        <CardContent className="p-4">
                                            <CardTitle className="text-white font-semibold text-lg">{anime.title}</CardTitle>
                                            <p className="text-gray-300 mt-2">⭐ {anime.rating?.toFixed(1) || 'N/A'}</p>
                                        </CardContent>
                                        <CardFooter className="p-4">
                                            <Button variant="ghost" className="text-yellow-500 hover:text-yellow-400" onClick={() => router.push(`/anime/${anime.id}`)}>
                                                Watch Now
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}