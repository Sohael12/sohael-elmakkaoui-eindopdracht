"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/navigation";

// Define the type for Manga
interface Manga {
    mal_id: number;
    title: string;
    synopsis: string;
    images: { webp: { image_url: string } };
}

// Define the type for a Chapter
interface Chapter {
    attributes: {
        chapter: number;
    };
}

export default function MangaDetailPage() {
    const params = useParams();
    const router = useRouter();
    const mangaId = params.id;
    const [manga, setManga] = useState<Manga | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [chapterId, setChapterId] = useState<number | null>(null);

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`);
                const data = await response.json();
                setManga(data.data);
            } catch {
                setError("Failed to load manga details.");
            } finally {
                setLoading(false);
            }
        };

        fetchManga();
    }, [mangaId]);

    // Fetch the chapters and find the selected chapter
    useEffect(() => {
        if (!mangaId || !chapterId) return;

        const fetchChapter = async () => {
            try {
                const chapterResponse = await fetch(`https://api.mangadex.org/manga/${mangaId}/feed`);
                const chapterData = await chapterResponse.json();

                const selectedChapter = chapterData.data.find((ch: Chapter) => ch.attributes.chapter === chapterId);

                if (!selectedChapter) throw new Error("Chapter not found.");

                // Handle chapter details here
                console.log("Selected Chapter:", selectedChapter);
            } catch (error) {
                setError("Failed to load chapter.");
            }
        };

        fetchChapter();
    }, [mangaId, chapterId]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Navbar />
            <div className="container mx-auto px-6 py-16">
                {/* Manga Detail Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Manga Image with Shadow Effect */}
                    <div className="flex-shrink-0">
                        <Image
                            src={manga?.images.webp.image_url || "/placeholder.svg"}
                            alt={manga?.title || "Manga"}
                            width={300}
                            height={450}
                            className="rounded-xl shadow-2xl transition-transform duration-300 transform hover:scale-105"
                        />
                    </div>

                    {/* Manga Info Section */}
                    <div className="flex-1 space-y-6">
                        <h1 className="text-4xl font-extrabold text-yellow-400 shadow-lg p-2 rounded-md">{manga?.title}</h1>
                        <p className="text-lg text-gray-300 shadow-inner p-4 rounded-md">{manga?.synopsis}</p>

                        {/* Chapter Selection */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <button
                                onClick={() => setChapterId(1)} // Set chapterId to 1 for example
                                className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                            >
                                Read Chapter 1
                            </button>
                            {/* Add more buttons for other chapters if needed */}
                        </div>
                    </div>
                </div>

                {/* Call to Action / Manga Related Links */}
                <div className="mt-12 text-center">
                    <button
                        onClick={() => router.push(`/manga/${mangaId}/related`)} // Example link to related mangas
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-lg shadow-md transition-all duration-300"
                    >
                        Explore More Manga
                    </button>
                </div>
            </div>

            {/* Footer with shadow */}
            <Footer />
        </div>
    );
}
