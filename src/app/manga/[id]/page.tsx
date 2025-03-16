"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Footer from "@/components/footer"
import Navbar from "@/components/navigation"
import { motion } from "framer-motion"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Star, Heart, ArrowLeft, BookMarked, Users, Bookmark, Share2, ExternalLink } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Manga {
    mal_id: number
    title: string
    title_japanese?: string
    synopsis: string
    background?: string
    images: { webp: { image_url: string } }
    favorites: number
    score?: number
    scored_by?: number
    rank?: number
    popularity?: number
    members?: number
    status?: string
    published?: {
        from?: string
        to?: string
        string?: string
    }
    chapters?: number
    volumes?: number
    genres?: Array<{ name: string }>
    authors?: Array<{ name: string }>
}

// Define the type for a Chapter
interface Chapter {
    attributes: {
        chapter: number
        title?: string
    }
}

export default function MangaDetailPage() {
    const params = useParams()
    const router = useRouter()
    const mangaId = params.id
    const [manga, setManga] = useState<Manga | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [chapterId, setChapterId] = useState<number | null>(null)
    const [chapters, setChapters] = useState<Chapter[]>([])
    const [activeTab, setActiveTab] = useState("overview")

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/manga/${mangaId}`)
                const data = await response.json()
                setManga(data.data)

                // Simulate chapters for demo purposes
                const simulatedChapters = Array.from({ length: 10 }, (_, i) => ({
                    attributes: {
                        chapter: i + 1,
                        title: `Chapter ${i + 1}: ${["The Beginning", "New Adventure", "Unexpected Turn", "Revelation", "The Battle", "Aftermath", "Recovery", "New Allies", "The Journey", "Finale"][i] || "Untitled"}`,
                    },
                }))
                setChapters(simulatedChapters)
            } catch {
                setError("Failed to load manga details.")
            } finally {
                setLoading(false)
            }
        }

        fetchManga()
    }, [mangaId])

    const goBack = () => router.back()

    if (loading) {
        return (
            <div className="bg-gradient-to-b from-[#0F0F0F] to-[#1a1a2e] text-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-6 py-16">
                    <Button onClick={goBack} variant="ghost" className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800/50">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="lg:w-1/3">
                            <Skeleton className="h-[500px] w-full max-w-[350px] rounded-xl" />
                        </div>

                        <div className="lg:w-2/3 space-y-6">
                            <Skeleton className="h-12 w-3/4" />
                            <Skeleton className="h-6 w-1/2" />

                            <div className="flex flex-wrap gap-3 my-4">
                                <Skeleton className="h-8 w-20 rounded-full" />
                                <Skeleton className="h-8 w-20 rounded-full" />
                                <Skeleton className="h-8 w-20 rounded-full" />
                            </div>

                            <Skeleton className="h-40 w-full rounded-lg" />

                            <div className="flex gap-4 mt-6">
                                <Skeleton className="h-10 w-32 rounded-md" />
                                <Skeleton className="h-10 w-32 rounded-md" />
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    if (error || !manga) {
        return (
            <div className="bg-gradient-to-b from-[#0F0F0F] to-[#1a1a2e] text-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-6 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-red-900/30 backdrop-blur-sm rounded-xl p-8 border border-red-800 max-w-lg mx-auto text-center"
                    >
                        <h2 className="text-2xl font-bold text-red-400 mb-4">Error Loading Manga</h2>
                        <p className="text-gray-300 mb-6">{error || "Manga not found."}</p>
                        <Button onClick={goBack} variant="outline" className="bg-red-900/50 border-red-700 hover:bg-red-800">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
                        </Button>
                    </motion.div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-b from-[#0F0F0F] to-[#1a1a2e] text-white min-h-screen">
            <Navbar />

            {/* Decorative elements */}
            <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
                <Button onClick={goBack} variant="ghost" className="mb-8 text-gray-400 hover:text-white hover:bg-gray-800/50">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Manga
                </Button>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                    <div className="relative">
                        {/* Main content */}
                        <div className="relative z-10 bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500"></div>

                            {/* Hero section with manga cover and basic info */}
                            <div className="flex flex-col lg:flex-row">
                                {/* Manga cover with effects */}
                                <motion.div
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="lg:w-1/3 p-6 flex justify-center"
                                >
                                    <div className="relative group max-w-[350px]">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-70 transition duration-1000"></div>
                                        <div className="relative">
                                            <Image
                                                src={manga.images.webp.image_url || "/placeholder.svg"}
                                                alt={manga.title}
                                                width={350}
                                                height={500}
                                                className="rounded-lg shadow-2xl object-cover w-full h-auto"
                                            />
                                        </div>

                                        {/* Stats badges */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.5 }}
                                            className="flex flex-wrap justify-center gap-3 mt-6"
                                        >
                                            {manga.score && (
                                                <Badge variant="outline" className="bg-blue-900/30 border-blue-700 text-blue-400 px-3 py-1">
                                                    <Star className="w-4 h-4 mr-1 inline" fill="currentColor" /> {manga.score}
                                                </Badge>
                                            )}

                                            {manga.favorites > 0 && (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-yellow-900/30 border-yellow-700 text-yellow-400 px-3 py-1"
                                                >
                                                    <Heart className="w-4 h-4 mr-1 inline" fill="currentColor" />{" "}
                                                    {manga.favorites.toLocaleString()}
                                                </Badge>
                                            )}

                                            {manga.chapters && (
                                                <Badge
                                                    variant="outline"
                                                    className="bg-purple-900/30 border-purple-700 text-purple-400 px-3 py-1"
                                                >
                                                    <BookOpen className="w-4 h-4 mr-1 inline" /> {manga.chapters} Chapters
                                                </Badge>
                                            )}
                                        </motion.div>

                                        {/* Action buttons */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.5, duration: 0.5 }}
                                            className="flex justify-center gap-3 mt-6"
                                        >
                                            <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700">
                                                <Bookmark className="w-4 h-4 mr-1" /> Save
                                            </Button>
                                            <Button variant="outline" size="sm" className="bg-gray-800/50 border-gray-700">
                                                <Share2 className="w-4 h-4 mr-1" /> Share
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                {/* Manga details */}
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="lg:w-2/3 p-8"
                                >
                                    <div className="space-y-6">
                                        {/* Title section */}
                                        <div>
                                            <motion.h1
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200"
                                            >
                                                {manga.title}
                                            </motion.h1>

                                            {manga.title_japanese && (
                                                <motion.p
                                                    initial={{ y: -10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.5, duration: 0.5 }}
                                                    className="text-xl text-gray-400 mt-2 font-medium"
                                                >
                                                    {manga.title_japanese}
                                                </motion.p>
                                            )}
                                        </div>

                                        {/* Genres */}
                                        {manga.genres && manga.genres.length > 0 && (
                                            <motion.div
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.6, duration: 0.5 }}
                                                className="flex flex-wrap gap-2"
                                            >
                                                {manga.genres.map((genre, index) => (
                                                    <Badge key={index} className="bg-gray-800 hover:bg-gray-700 text-gray-200">
                                                        {genre.name}
                                                    </Badge>
                                                ))}
                                            </motion.div>
                                        )}

                                        {/* Tabs for different sections */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7, duration: 0.5 }}
                                            className="mt-6"
                                        >
                                            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                                                <TabsList className="bg-gray-800/70 border border-gray-700">
                                                    <TabsTrigger value="overview" className="data-[state=active]:bg-gray-700">
                                                        Overview
                                                    </TabsTrigger>
                                                    <TabsTrigger value="chapters" className="data-[state=active]:bg-gray-700">
                                                        Chapters
                                                    </TabsTrigger>
                                                    <TabsTrigger value="details" className="data-[state=active]:bg-gray-700">
                                                        Details
                                                    </TabsTrigger>
                                                </TabsList>

                                                <TabsContent value="overview" className="mt-6">
                                                    <div className="space-y-6">
                                                        {/* Synopsis */}
                                                        <div>
                                                            <h3 className="text-xl font-semibold mb-3 text-gray-200">Synopsis</h3>
                                                            <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/50">
                                                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                                                    {manga.synopsis || "No synopsis available."}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Background */}
                                                        {manga.background && (
                                                            <div>
                                                                <h3 className="text-xl font-semibold mb-3 text-gray-200">Background</h3>
                                                                <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/50">
                                                                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                                                        {manga.background}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Quick stats */}
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                                                            {manga.status && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <p className="text-sm text-gray-400">Status</p>
                                                                    <p className="font-medium text-white">{manga.status}</p>
                                                                </div>
                                                            )}

                                                            {manga.published?.string && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <p className="text-sm text-gray-400">Published</p>
                                                                    <p className="font-medium text-white">{manga.published.string}</p>
                                                                </div>
                                                            )}

                                                            {manga.volumes && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <p className="text-sm text-gray-400">Volumes</p>
                                                                    <p className="font-medium text-white">{manga.volumes}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="chapters" className="mt-6">
                                                    <div className="space-y-4">
                                                        <h3 className="text-xl font-semibold text-gray-200">Chapters</h3>

                                                        <div className="grid gap-3">
                                                            {chapters.length > 0 ? (
                                                                chapters.map((chapter, index) => (
                                                                    <motion.div
                                                                        key={index}
                                                                        initial={{ opacity: 0, y: 10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                                                                        className="bg-gray-800/50 hover:bg-gray-700/50 rounded-lg p-4 border border-gray-700 flex justify-between items-center cursor-pointer"
                                                                        onClick={() => setChapterId(chapter.attributes.chapter)}
                                                                    >
                                                                        <div>
                                                                            <p className="font-medium text-white">{chapter.attributes.title}</p>
                                                                            <p className="text-sm text-gray-400">Chapter {chapter.attributes.chapter}</p>
                                                                        </div>
                                                                        <Button variant="ghost" size="sm" className="text-yellow-400">
                                                                            Read <ArrowLeft className="ml-1 w-4 h-4 rotate-180" />
                                                                        </Button>
                                                                    </motion.div>
                                                                ))
                                                            ) : (
                                                                <div className="text-center py-8 bg-gray-800/30 rounded-lg border border-gray-700">
                                                                    <BookMarked className="mx-auto h-12 w-12 text-gray-500 mb-2" />
                                                                    <p className="text-gray-400">No chapters available</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TabsContent>

                                                <TabsContent value="details" className="mt-6">
                                                    <div className="space-y-6">
                                                        <h3 className="text-xl font-semibold text-gray-200">Additional Information</h3>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                            {manga.rank && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <p className="text-sm text-gray-400">Rank</p>
                                                                    <p className="font-medium text-white">#{manga.rank}</p>
                                                                </div>
                                                            )}

                                                            {manga.popularity && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <p className="text-sm text-gray-400">Popularity</p>
                                                                    <p className="font-medium text-white">#{manga.popularity}</p>
                                                                </div>
                                                            )}

                                                            {manga.members && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <div className="flex items-center gap-2">
                                                                        <Users className="h-4 w-4 text-gray-400" />
                                                                        <p className="text-sm text-gray-400">Members</p>
                                                                    </div>
                                                                    <p className="font-medium text-white">{manga.members.toLocaleString()}</p>
                                                                </div>
                                                            )}

                                                            {manga.scored_by && (
                                                                <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                                                                    <div className="flex items-center gap-2">
                                                                        <Star className="h-4 w-4 text-gray-400" />
                                                                        <p className="text-sm text-gray-400">Scored By</p>
                                                                    </div>
                                                                    <p className="font-medium text-white">{manga.scored_by.toLocaleString()} users</p>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Authors */}
                                                        {manga.authors && manga.authors.length > 0 && (
                                                            <div>
                                                                <h3 className="text-lg font-semibold mb-2 text-gray-200">Authors</h3>
                                                                <div className="flex flex-wrap gap-2">
                                                                    {manga.authors.map((author, index) => (
                                                                        <Badge key={index} variant="outline" className="bg-gray-800/50 border-gray-700">
                                                                            {author.name}
                                                                        </Badge>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        className="mt-12 text-center"
                    >
                        <div className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 max-w-2xl mx-auto">
                            <h3 className="text-xl font-bold text-yellow-400 mb-3">Start Reading Now</h3>
                            <p className="text-gray-300 mb-6">
                                Begin your journey with this manga and explore more titles in our collection.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button onClick={() => setChapterId(1)} className="bg-yellow-500 hover:bg-yellow-400 text-black">
                                    <BookOpen className="mr-2 h-4 w-4" /> Read Chapter 1
                                </Button>
                                <Button
                                    onClick={() => router.push("/manga")}
                                    variant="outline"
                                    className="border-yellow-700 text-yellow-400 hover:bg-yellow-900/30"
                                >
                                    <ExternalLink className="mr-2 h-4 w-4" /> Explore More Manga
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <Footer />
        </div>
    )
}

