"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

interface Chapter {
    attributes: {
        chapter: number;
        hash: string;
        data: string[];
    };
}

export default function ChapterPage() {
    const params = useParams();
    const router = useRouter();
    const mangaId = params.id;

    // Get the current chapter ID from URL parameters
    const chapterId = Array.isArray(params.chapterId) ? parseInt(params.chapterId[0], 10) : parseInt(params.chapterId || "1", 10);

    const [pages, setPages] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [allChapters, setAllChapters] = useState<Chapter[]>([]); // To hold all chapters for navigation

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                // Fetch MangaDex API for chapters list
                const chapterResponse = await fetch(`https://api.mangadex.org/manga/${mangaId}/feed`);
                const chapterData = await chapterResponse.json();

                // Store all the chapters
                setAllChapters(chapterData.data);

                // Find the selected chapter
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

    // Function to go to the previous chapter
    const goToPreviousChapter = () => {
        const prevChapter = allChapters.find((ch: Chapter) => ch.attributes.chapter === chapterId - 1);
        if (prevChapter) {
            router.push(`/manga/${mangaId}/chapter/${prevChapter.attributes.chapter}`);
        }
    };

    // Function to go to the next chapter
    const goToNextChapter = () => {
        const nextChapter = allChapters.find((ch: Chapter) => ch.attributes.chapter === chapterId + 1);
        if (nextChapter) {
            router.push(`/manga/${mangaId}/chapter/${nextChapter.attributes.chapter}`);
        }
    };

    if (loading) return <div className="text-center py-10">Loading...</div>;
    if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-6 py-12 space-y-4">
            <h1 className="text-3xl font-bold text-yellow-400">Chapter {chapterId}</h1>

            {/* Display Manga Pages */}
            {pages.map((page, index) => (
                <Image key={index} src={page} alt={`Page ${index + 1}`} width={800} height={1200} className="rounded-lg" />
            ))}

            {/* Chapter Navigation */}
            <div className="flex justify-between mt-6">
                <button
                    onClick={goToPreviousChapter}
                    disabled={chapterId === 1} // Disable previous button on the first chapter
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    Previous Chapter
                </button>
                <button
                    onClick={goToNextChapter}
                    disabled={chapterId === allChapters.length} // Disable next button on the last chapter
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg disabled:opacity-50"
                >
                    Next Chapter
                </button>
            </div>
        </div>
    );
}
