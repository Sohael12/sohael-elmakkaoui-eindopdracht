import Link from "next/link";
import Image from "next/image";
import { db } from "@/db/client";
import { animes, episodes } from "@/db/anime";
import { eq, and, gt, lt } from "drizzle-orm";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';
import { notFound } from "next/navigation";
import { desc } from "drizzle-orm";  // Add this import

interface EpisodePageProps {
    params: Promise<{
        id: string
    }>
}

export default async function EpisodePage({ params }: EpisodePageProps) {
    const { id } = await params;

    try {
        // Fetch the current episode
        const [episode] = await db.select().from(episodes).where(eq(episodes.id, id));

        if (!episode) {
            notFound();
        }

        const [anime] = await db.select().from(animes).where(eq(animes.id, episode.animeId));

        if (!anime) {
            notFound();
        }

        // Fetch all episodes for this anime for the episode list
        const allEpisodes = await db
            .select()
            .from(episodes)
            .where(eq(episodes.animeId, episode.animeId))
            .orderBy(episodes.episodeNumber);

        const [previousEpisode] = await db
            .select()
            .from(episodes)
            .where(
                and(
                    eq(episodes.animeId, episode.animeId),
                    lt(episodes.episodeNumber, episode.episodeNumber)
                )
            )
            .orderBy(desc(episodes.episodeNumber))
            .limit(1);


        const [nextEpisode] = await db
            .select()
            .from(episodes)
            .where(
                and(
                    eq(episodes.animeId, episode.animeId),
                    gt(episodes.episodeNumber, episode.episodeNumber)
                )
            )
            .orderBy(episodes.episodeNumber)
            .limit(1);

        return (
            <div className="bg-gradient-to-b from-gray-900 to-[#0A0A0F] text-white min-h-screen">
                <Navbar />

                <main className="container mx-auto px-4 py-8 pt-20">
                    {/* Back to Anime Link */}
                    <div className="mb-6">
                        <Link href={`/anime/${anime.id}`}>
                            <Button variant="ghost" className="text-gray-400 hover:text-white gap-2">
                                <ArrowLeft className="w-4 h-4" />
                                Terug naar {anime.title}
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content - Video Player and Episode Info */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Episode Title */}
                            <div>
                                <h1 className="text-3xl font-bold">{episode.title}</h1>
                                <div className="flex items-center gap-3 mt-2 text-gray-400">
                                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
                                        Aflevering {episode.episodeNumber}
                                    </span>


                                </div>
                            </div>

                            <div className="bg-gray-800/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                                {episode.videoUrl ? (
                                    <VideoPlayer
                                        videoUrl={episode.videoUrl}
                                        title={`${anime.title} - Aflevering ${episode.episodeNumber}`}
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center bg-gray-900 rounded-lg p-10 text-center aspect-video">
                                        <Image
                                            src="/placeholder.svg?height=400&width=600&text=No+Video+Available"
                                            alt="No video available"
                                            width={600}
                                            height={400}
                                            className="rounded-lg mb-4"
                                        />
                                        <p className="text-yellow-500 font-semibold">Video is niet beschikbaar op dit moment.</p>
                                        <p className="text-gray-400 mt-2">We werken eraan om deze content zo snel mogelijk beschikbaar te maken.</p>
                                    </div>
                                )}
                            </div>

                            {episode.description && (
                                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                                    <h2 className="text-xl font-bold mb-3">Beschrijving</h2>
                                    <p className="text-gray-300">{episode.description}</p>
                                </div>
                            )}

                            {/* Episode Navigation */}
                            <div className="flex justify-between items-center">
                                {previousEpisode ? (
                                    <Link href={`/episodes/${previousEpisode.id}`}>
                                        <Button variant="outline" className="border-gray-700 gap-2">
                                            <ChevronLeft className="w-4 h-4" />
                                            Vorige Aflevering
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button variant="outline" className="border-gray-700 opacity-50 cursor-not-allowed" disabled>
                                        <ChevronLeft className="w-4 h-4 mr-2" />
                                        Vorige Aflevering
                                    </Button>
                                )}

                                {nextEpisode ? (
                                    <Link href={`/episodes/${nextEpisode.id}`}>
                                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold gap-2">
                                            Volgende Aflevering
                                            <ChevronRight className="w-4 h-4" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Button className="bg-gray-700 opacity-50 cursor-not-allowed" disabled>
                                        Volgende Aflevering
                                        <ChevronRight className="w-4 h-4 ml-2" />
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Sidebar - Episode List */}
                        <div>
                            <div className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl border border-gray-700 sticky top-20">
                                <div className="p-6 border-b border-gray-700">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <span className="text-yellow-500">{anime.title}</span>
                                    </h2>
                                    <p className="text-gray-400 text-sm mt-1">{allEpisodes.length} afleveringen</p>
                                </div>

                                <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                                    {allEpisodes.length === 0 ? (
                                        <p className="text-center py-8 text-red-400">Geen afleveringen beschikbaar</p>
                                    ) : (
                                        allEpisodes.map((ep) => (
                                            <Link key={ep.id} href={`/episodes/${ep.id}`}>
                                                <div
                                                    className={`rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 group cursor-pointer p-4 ${
                                                        ep.id === episode.id ? 'bg-gray-700 border-l-4 border-yellow-500' : 'bg-gray-800/50'
                                                    }`}
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <span className={`text-sm font-medium ${ep.id === episode.id ? 'text-yellow-400' : 'text-gray-400'}`}>
                                                            Aflevering {ep.episodeNumber}
                                                        </span>

                                                    </div>
                                                    <h3 className={`text-base font-medium mt-1 group-hover:text-yellow-400 transition-colors ${
                                                        ep.id === episode.id ? 'text-white' : ''
                                                    }`}>
                                                        {ep.title}
                                                    </h3>
                                                </div>
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        );
    } catch (error) {
        console.error("Error fetching episode:", error);
        return (
            <div className="bg-gradient-to-b from-gray-900 to-[#0A0A0F] text-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Er is een fout opgetreden</h1>
                    <p className="text-gray-300 mb-8">We konden de aflevering niet laden. Probeer het later opnieuw.</p>
                    <Link href="/">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                            Terug naar Home
                        </Button>
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }
}