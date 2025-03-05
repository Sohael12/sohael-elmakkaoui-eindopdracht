import React from "react";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import { db } from "@/db/client";
import { animes, episodes } from "@/db/anime";
import { eq } from "drizzle-orm";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;

    // Fetch the anime details from the database
    const [anime] = await db
        .select()
        .from(animes)
        .where(eq(animes.id, id));

    // If anime not found
    if (!anime) {
        return <div className="text-white text-center py-20">Anime niet gevonden!</div>;
    }

    // Fetch episodes for the anime
    const episodesList = await db
        .select()
        .from(episodes)
        .where(eq(episodes.animeId, id));

    // Determine if there's a full episode video for the anime
    const videoSrc: string | undefined = anime.fullEpisodeVideo || undefined;

    return (
        <div className="bg-[#121212] text-white min-h-screen">
            <Navbar />

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Anime Header */}
                <div className="relative">
                    <img

                        alt={anime.title}
                        className="absolute inset-0 w-full h-full object-cover rounded-lg opacity-50"
                    />
                    <div className="relative z-10">
                        <h1 className="text-5xl font-bold">{anime.title}</h1>
                        <p className="mt-4 text-yellow-400 text-lg">
                            Rating: {anime.rating || "Niet beschikbaar"}
                        </p>
                    </div>
                </div>

                {/* Video Player Section */}
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    {videoSrc ? (
                        <div className="w-full lg:w-2/3 bg-black rounded-lg overflow-hidden shadow-xl">
                            <video
                                src={videoSrc}
                                className="w-full h-72 object-cover"
                                poster={anime.image || "/path/to/default/image.png"}
                                controls
                            />
                        </div>
                    ) : (
                        <div className="text-red-500">Video is niet beschikbaar op dit moment.</div>
                    )}
                </div>

                {/* Anime Description */}
                <div className="mt-6 bg-[#1A1A1A] p-6 rounded-lg shadow-md">
                    <p className="text-gray-300">{anime.description}</p>
                </div>

                {/* Episodes Section */}
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold">Afleveringen</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                        {episodesList.length === 0 ? (
                            <p className="text-red-500">Er zijn geen afleveringen beschikbaar voor deze anime.</p>
                        ) : (
                            episodesList.map((episode) => (
                                <div
                                    key={episode.id}
                                    className="bg-gray-800 p-4 rounded-lg shadow-md transform transition-all hover:scale-105"
                                >
                                    <h3 className="text-xl font-semibold">{episode.title}</h3>
                                    <p className="text-gray-400 text-sm mt-2">Aflevering {episode.episodeNumber}</p>
                                    <p className="text-gray-300 mt-2">{episode.description}</p>

                                    {/* Video for episode */}
                                    <div className="mt-4">
                                        <video
                                            src={episode.videoUrl}
                                            className="w-full h-48 object-cover rounded-lg shadow-lg"
                                            poster={anime.image || "/path/to/default/image.png"}
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
