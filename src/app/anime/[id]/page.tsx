import Navbar from "@/components/navigation"
import Footer from "@/components/footer"
import { db } from "@/db/client"
import { animes, episodes } from "@/db/anime"
import { eq } from "drizzle-orm"
import { Play, Star } from "lucide-react"
import Link from "next/link"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function Page({ params }: PageProps) {
    const { id } = await params

    // Fetch the anime details from the database
    const [anime] = await db.select().from(animes).where(eq(animes.id, id))

    // If anime not found
    if (!anime) {
        return (
            <div className="bg-[#121212] min-h-screen flex items-center justify-center">
                <div className="text-white text-center py-20 max-w-md mx-auto bg-[#1A1A1A] rounded-lg shadow-xl p-8">
                    <h2 className="text-2xl font-bold mb-4">Anime niet gevonden!</h2>
                    <p className="text-gray-400 mb-6">De anime die je zoekt bestaat niet of is verwijderd.</p>
                    <Link
                        href="/animes"
                        className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-md transition-all duration-300"
                    >
                        Terug naar alle animes
                    </Link>
                </div>
            </div>
        )
    }

    // Fetch episodes for the anime
    const episodesList = await db.select().from(episodes).where(eq(episodes.animeId, id))

    // Determine if there's a full episode video for the anime
    const videoSrc: string | undefined = anime.fullEpisodeVideo || undefined

    return (
        <div className="bg-[#121212] text-white min-h-screen">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <div className="relative rounded-xl overflow-hidden mb-10">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/70 to-transparent z-10"></div>
                    {anime.image ? (
                        <img src={anime.image || "/placeholder.svg"} alt={anime.title} className="w-full h-[300px] sm:h-[400px] object-cover" />
                    ) : (
                        <div className="w-full h-[300px] sm:h-[400px] bg-gradient-to-r from-gray-800 to-gray-900"></div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
                        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{anime.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                            {anime.rating && (
                                <div className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                                    <Star className="w-4 h-4" />
                                    <span>{anime.rating}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {videoSrc ? (
                            <div className="bg-[#1A1A1A] rounded-xl overflow-hidden shadow-xl">
                                <video src={videoSrc} className="w-full h-full object-cover" controls />
                                <div className="p-4">
                                    <h2 className="text-xl font-semibold">Bekijk nu: {anime.title}</h2>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-[#1A1A1A] rounded-xl p-8 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 flex items-center justify-center">
                                    <Play className="w-8 h-8 text-red-500" />
                                </div>
                                <h3 className="text-xl font-medium mb-2">Video niet beschikbaar</h3>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <div className="bg-[#1A1A1A] rounded-xl shadow-md overflow-hidden sticky top-4">
                            <div className="p-6 border-b border-gray-800">
                                <h2 className="text-2xl font-semibold">Afleveringen</h2>
                                <p className="text-gray-400 text-sm mt-1">{episodesList.length} beschikbaar</p>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto p-4">
                                {episodesList.length === 0 ? (
                                    <p className="text-center py-8 text-red-400">Geen afleveringen beschikbaar</p>
                                ) : (
                                    episodesList.map((episode) => (
                                        <Link key={episode.id} href={`/episodes/${episode.id}`} passHref>
                                            <div className="bg-[#252525] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#303030] hover:shadow-lg group cursor-pointer p-4">
                                                <h3 className="text-lg font-medium group-hover:text-yellow-400 transition-colors">{episode.title}</h3>
                                                <span className="bg-gray-700 text-xs px-2 py-1 rounded-md">#{episode.episodeNumber}</span>
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
    )
}
