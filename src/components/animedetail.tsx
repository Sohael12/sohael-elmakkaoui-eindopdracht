"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import animes from "@/src/lib/data";
import Navbar from "@/src/components/navigation";
import Footer from "@/src/components/footer";

const AnimeDetail = () => {
    const params = useParams();
    const [anime, setAnime] = useState(null);

    useEffect(() => {
        const id = params?.id;
        if (id) {
            const animeId = Array.isArray(id) ? id[0] : id;
            const selectedAnime = animes.find((a) => a.id === Number.parseInt(animeId, 10));
            setAnime(selectedAnime || null);
        }
    }, [params]);

    if (!anime) {
        return <div className="text-white text-center py-20">Anime niet gevonden!</div>;
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
                            <li className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Aflevering 1</li>
                            <li className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Aflevering 2</li>
                            <li className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 cursor-pointer">Aflevering 3</li>
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