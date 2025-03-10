

import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/navigation"
import Footer from "@/components/footer"
import { db } from "@/db/client"
import { animes } from "@/db/anime"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Star, Search } from "lucide-react"
import {AnimeCarousel} from "@/components/animecoursel";

export default async function AllAnimesPage() {
    // Fetch all animes from the database
    const animesList = await db.select().from(animes)

    // Add some sample descriptions for the featured animes
    const enhancedAnimes = animesList.map((anime) => ({
        ...anime,
        description:
            anime.description ||
            `Ontdek ${anime.title}, een van de beste ${anime.genre || "anime"} series in onze collectie. Bekijk nu en geniet van deze geweldige anime ervaring.`,
    }))

    return (
        <div className="bg-[#0A0A1B] text-white min-h-screen overflow-x-hidden">
            <Navbar />

            <main className="pt-16">
                {/* Hero Carousel Section */}
                <section className="container mx-auto px-6 py-8">
                    <AnimeCarousel animes={enhancedAnimes} />
                </section>

                {/* Main Anime Grid Section */}
                <section className="py-12 container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                            Alle Animes
                        </h2>
                    </div>

                    {/* Main Anime Grid */}
                    <div>
                        {animesList.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {animesList.map((anime) => (
                                    <Link key={anime.id} href={`/anime/${anime.id}`} className="transform transition-all hover:scale-105">
                                        <Card className="bg-[#1A1A2E] border-none rounded-xl overflow-hidden shadow-lg hover:shadow-purple-900/20">
                                            <CardHeader className="p-0">
                                                <div className="relative aspect-[2/3]">
                                                    <Image
                                                        src={anime.image || "/placeholder.svg"}
                                                        alt={anime.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-transparent to-transparent"></div>
                                                    <div className="absolute top-2 right-2 bg-black/60 rounded-full px-2 py-1 flex items-center">
                                                        <Star className="text-yellow-400 fill-yellow-400 mr-1 h-3 w-3" />
                                                        <span className="text-xs font-medium">{anime.rating || "N/A"}</span>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <CardTitle className="text-white text-base font-medium line-clamp-1 mb-1">
                                                    {anime.title}
                                                </CardTitle>
                                                <p className="text-xs text-gray-400 line-clamp-1">{anime.genre || "Geen genre"}</p>
                                            </CardContent>
                                            <CardFooter className="p-4 pt-0">
                                                <Button variant="ghost" className="w-full bg-white/5 hover:bg-white/10 text-white">
                                                    <Play className="mr-2 h-4 w-4" /> Watch Now
                                                </Button>
                                            </CardFooter>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <div className="bg-white/5 rounded-full p-6 mb-4">
                                    <Search className="h-10 w-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-medium text-white mb-2">Geen animes gevonden</h3>
                                <p className="text-gray-400 max-w-md">Er zijn momenteel geen animes beschikbaar in onze database.</p>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    )
}

