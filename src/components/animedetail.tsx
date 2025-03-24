"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import animes from "@/lib/data";

const AnimeDetail = () => {
    const params = useParams();
    const [anime, setAnime] = useState<any>(null);

    useEffect(() => {
        const id = params?.id; // Extract anime ID from URL parameters
        if (id) {
            const animeId = Array.isArray(id) ? id[0] : id; // Ensure `id` is a string,
            const selectedAnime = animes.find((a) => a.id === Number.parseInt(animeId, 10));
            setAnime(selectedAnime || null);
        }
    }, [params]);

    if (!anime) {
        return <div className="text-white text-center py-20">Anime niet gevonden!</div>; // Show a message if anime is not found
    }

    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">{anime.title}</h1>
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    <video
                        src={anime.fullEpisodeVideo}
                        className="w-full lg:w-4/3 h-64 object-cover rounded-lg shadow-lg"
                        poster={anime.image}
                        controls
                    />
                    <div className="bg-gray-900 p-4 rounded-lg lg:w-1/3">
                        <h2 className="text-xl font-semibold mb-3">Afleveringen</h2>
                        <ul className="space-y-2">
                            {anime.episodes.map((episode: any, index: number) => (
                                <li
                                    key={index}
                                    className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer"
                                >
                                    {`Aflevering ${index + 1}`}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                    <p className="text-gray-300">{anime.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AnimeDetail;
