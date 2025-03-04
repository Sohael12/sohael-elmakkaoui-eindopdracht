import React from "react";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import { db } from "@/db/client";
import {animes, episodes} from "@/db/anime";
import { eq } from "drizzle-orm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    // Wacht op de `params` voordat je ze gebruikt
    const { id } = await params;

    // Haal de anime op basis van de ID uit de database
    const [anime] = await db
        .select()
        .from(animes)
        .where(eq(animes.id, id));

    // Als de anime niet wordt gevonden, toon een foutmelding
    if (!anime) {
        return <div className="text-white text-center py-20">Anime niet gevonden!</div>;
    }
    const episodesList = await db
        .select()
        .from(episodes)
        .where(eq(episodes.animeId, id));

    // Controleer of de video beschikbaar is
    const videoSrc: string | undefined = anime.fullEpisodeVideo
        ? anime.fullEpisodeVideo
        : undefined;

    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">{anime.title}</h1>

                {/* Toon de rating */}
                <div className="mt-4">
                    <p className="text-yellow-400 text-lg">
                        Rating: {anime.rating || "Niet beschikbaar"}
                    </p>
                </div>

                {/* Video sectie */}
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    {videoSrc ? (
                        <video
                            src={videoSrc}
                            className="w-full lg:w-4/3 h-64 object-cover rounded-lg shadow-lg"
                            poster={anime.image || "/path/to/default/image.png"} // Standaard fallback image
                            controls
                        />
                    ) : (
                        <div className="text-red-500">
                            Video is niet beschikbaar op dit moment.
                        </div>
                    )}
                </div>

                {/* Beschrijving */}
                <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                    <p className="text-gray-300">{anime.description}</p>
                </div>

                {/* Afleveringen sectie */}
                <div className="mt-6 bg-gray-800 p-6 rounded-lg">
                    <h2 className="text-2xl font-semibold text-white">Afleveringen</h2>
                    <div className="mt-4">
                        {episodesList.length === 0 ? (
                            <p className="text-red-500">Er zijn geen afleveringen beschikbaar voor deze anime.</p>
                        ) : (
                            episodesList.map((episode) => (
                                <div key={episode.id} className="bg-gray-700 p-4 rounded-lg mb-4">
                                    <h3 className="text-xl font-semibold text-white">{episode.title}</h3>
                                    <p className="text-gray-400 text-sm">Episode {episode.episodeNumber}</p>
                                    <p className="text-gray-300 mt-2">{episode.description}</p>

                                    {/* Video voor aflevering */}
                                    <div className="mt-2">
                                        <video
                                            src={episode.videoUrl}
                                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                                            poster={anime.image || "/path/to/default/image.png"} // Fallback image voor de aflevering
                                            controls
                                        />
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}