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

                // Type the 'ch' as Chapter
                const selectedChapter = chapterData.data.find((ch: Chapter) => ch.attributes.chapter === chapterId);

                if (!selectedChapter) throw new Error("Chapter not found.");

                // Do something with the selected chapter, e.g. set it in state
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
        <div>
            <Navbar />
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-6">
                    <Image
                        src={manga?.images.webp.image_url || "/placeholder.svg"}
                        alt={manga?.title || "Manga"}
                        width={300}
                        height={450}
                        className="rounded-lg shadow-lg"
                    />
                    <div className="flex-1 space-y-4">
                        <h1 className="text-3xl font-bold text-yellow-400">{manga?.title}</h1>
                        <p className="text-gray-400">{manga?.synopsis}</p>
                        <button
                            onClick={() => setChapterId(1)} // Set chapterId to 1 or change accordingly
                            className="bg-yellow-500 text-black px-4 py-2 rounded-lg"
                        >
                            Read Chapter 1
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
