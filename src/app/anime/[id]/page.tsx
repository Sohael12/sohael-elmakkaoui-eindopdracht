import Link from "next/link"
import Image from "next/image"
import {db} from "@/db/client"
import {animes, episodes} from "@/db/anime"
import {eq} from "drizzle-orm"
import Navbar from "@/components/navigation"
import Footer from "@/components/footer"
import {Button} from "@/components/ui/button"
import {Play, Star, ArrowLeft} from "lucide-react"
import {notFound} from "next/navigation"

interface PageProps {
    params: Promise<{
        id: string
    }>
}

export default async function Page({params}: PageProps) {
    try {
        const {id} = await params
        const [anime] = await db.select().from(animes).where(eq(animes.id, id))

        // If anime is not found
        if (!anime) {
            notFound()
        }

        const episodesList = await db
            .select()
            .from(episodes)
            .where(eq(episodes.animeId, id))
            .orderBy(episodes.episodeNumber)

        const videoSrc: string | undefined = anime.fullEpisodeVideo || undefined

        return (
            <div className="bg-gradient-to-b from-gray-900 to-[#0A0A0F] text-white min-h-screen">
                <Navbar/>
                <main className="container mx-auto px-4 py-8 pt-20">
                    {/* Back to Animes Link */}
                    <div className="mb-6">
                        <Link href="/animes">
                            <Button variant="ghost" className="text-gray-400 hover:text-white gap-2">
                                <ArrowLeft className="w-4 h-4"/>
                                Terug naar alle animes
                            </Button>
                        </Link>
                    </div>

                    <div className="relative rounded-xl overflow-hidden mb-10 border border-gray-700 shadow-2xl">
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent z-10"></div>
                        {anime.image ? (
                            <Image
                                src={anime.image || "/placeholder.svg"}
                                alt={anime.title}
                                width={1200}
                                height={400}
                                className="w-full h-[300px] sm:h-[400px] object-cover"
                            />
                        ) : (
                            <div
                                className="w-full h-[300px] sm:h-[400px] bg-gradient-to-r from-gray-800 to-gray-900"></div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 z-20">
                            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">{anime.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-sm">
                                {anime.rating && (
                                    <div
                                        className="flex items-center gap-1 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                                        <Star className="w-4 h-4"/>
                                        <span>{anime.rating}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            {videoSrc ? (
                                <div
                                    className="bg-gray-800/80 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl border border-gray-700">
                                    <video src={videoSrc} className="w-full h-full object-cover" controls/>
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold">Bekijk nu: {anime.title}</h2>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    className="bg-gray-800/80 backdrop-blur-md rounded-xl p-8 text-center border border-gray-700 shadow-2xl">
                                    <div
                                        className="w-16 h-16 mx-auto mb-4 bg-yellow-500/20 flex items-center justify-center rounded-full">
                                        <Play className="w-8 h-8 text-yellow-500"/>
                                    </div>
                                    <h3 className="text-xl font-medium mb-2">Video niet beschikbaar</h3>
                                    <p className="text-gray-400">Bekijk de afleveringen hieronder om te beginnen met
                                        kijken.</p>
                                </div>
                            )}

                            {anime.description && (
                                <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700">
                                    <h2 className="text-xl font-bold mb-3">Beschrijving</h2>
                                    <p className="text-gray-300">{anime.description}</p>
                                </div>
                            )}
                        </div>
                        <div>
                            <div
                                className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-xl border border-gray-700 sticky top-20">
                                <div className="p-6 border-b border-gray-700">
                                    <h2 className="text-xl font-bold">Afleveringen</h2>
                                    <p className="text-gray-400 text-sm mt-1">{episodesList.length} beschikbaar</p>
                                </div>
                                <div className="max-h-[600px] overflow-y-auto p-4 space-y-3">
                                    {episodesList.length === 0 ? (
                                        <p className="text-center py-8 text-red-400">Geen afleveringen beschikbaar</p>
                                    ) : (
                                        episodesList.map((episode) => (
                                            <Link key={episode.id} href={`/episodes/${episode.id}`}>
                                                <div
                                                    className="bg-gray-800/50 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-700 group cursor-pointer p-4">
                                                    <div className="flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-400">
                              Aflevering {episode.episodeNumber}
                            </span>
                                                    </div>
                                                    <h3 className="text-base font-medium mt-1 group-hover:text-yellow-400 transition-colors">
                                                        {episode.title}
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
                <Footer/>
            </div>
        )
    } catch (error) {
        console.error("Error fetching anime:", error)
        return (
            <div className="bg-gradient-to-b from-gray-900 to-[#0A0A0F] text-white min-h-screen">
                <Navbar/>
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Er is een fout opgetreden</h1>
                    <p className="text-gray-300 mb-8">We konden de anime niet laden. Probeer het later opnieuw.</p>
                    <Link href="/">
                        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">Terug naar
                            Home</Button>
                    </Link>
                </div>
                <Footer/>
            </div>
        )
    }
}

