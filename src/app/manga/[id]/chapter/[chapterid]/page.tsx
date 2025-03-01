"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

interface Chapter {
    attributes: {
        chapter: number;
        hash: string;
        data: string[]
    };
}

export default function ChapterPage() {
    const params = useParams();
    const mangaId = params.id;

    const chapterId = Array.isArray(params.chapterId) ? parseInt(params.chapterId[0], 10) : parseInt(params.chapterId || "1", 10);

    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                // MangaDex API request voor hoofdstuk ID
                const chapterResponse = await fetch(`https://api.mangadex.org/manga/${mangaId}/feed`);
                const chapterData = await chapterResponse.json();

                // Explicitly type the `ch` object to `Chapter`
                const selectedChapter = chapterData.data.find((ch: Chapter) => ch.attributes.chapter === chapterId);

                if (!selectedChapter) throw new Error("Chapter not found.");

                const chapterHash = selectedChapter.attributes.hash;
                const chapterPages = selectedChapter.attributes.data;

                // Construct URLs for pages (file is a string)
                const imageUrls = chapterPages.map((file: string) => `https://uploads.mangadex.org/data/${chapterHash}/${file}`);

                setPages(imageUrls);
            } catch (err) {
                setError("Failed to load chapter.");
            } finally {
                setLoading(false);
            }
        };

        fetchChapter();
    }, [mangaId, chapterId]);

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-6 py-12 space-y-4">
            <h1 className="text-3xl font-bold text-yellow-400">Chapter {chapterId}</h1>
            {pages.map((page, index) => (
                <Image key={index} src={page} alt={`Page ${index + 1}`} width={800} height={1200} className="rounded-lg" />
            ))}
        </div>
    );
}
