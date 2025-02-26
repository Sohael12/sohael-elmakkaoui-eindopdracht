import React from "react";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import { db } from "@/db/client";
import { animes } from "@/db/anime";

export default async function Page() {
    const data = await db.select().from(animes);
    const anime = data[0];

    if (!anime) {
        return <div className="text-white text-center py-20">Anime niet gevonden!</div>;
    }

    // Check that fullEpisodeVideo is a valid string and set the videoSrc accordingly
    const videoSrc: string | undefined = anime.fullEpisodeVideo ? anime.fullEpisodeVideo : undefined;

    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">{anime.title}</h1>
                <div className="mt-6 flex flex-col lg:flex-row gap-6">
                    {videoSrc ? (
                        <video
                            src={videoSrc}
                            className="w-full lg:w-4/3 h-64 object-cover rounded-lg shadow-lg"
                            poster={anime.image || "/path/to/default/image.png"}  // Default fallback image
                            controls
                        />
                    ) : (
                        <div className="text-red-500">Video is not available at the moment.</div>
                    )}
                </div>
                <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                    <p className="text-gray-300">{anime.description}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
}
