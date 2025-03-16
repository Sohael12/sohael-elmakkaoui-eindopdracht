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
import { Heart, Calendar, Droplet, ArrowLeft, Users } from "lucide-react"

interface Character {
    mal_id: number
    name: string
    name_kanji: string
    images: {
        webp: {
            image_url: string
        }
    }
    favorites: number
    about: string
    birthday?: string
    blood_type?: string
}

export default function CharacterDetailPage() {
    const params = useParams()
    const router = useRouter()
    const characterId = params.id
    const [character, setCharacter] = useState<Character | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(
                    `https://api.jikan.moe/v4/characters/${characterId}`
                )
                const data = await response.json()
                setCharacter(data.data)
            } catch {
                setError("Failed to load character details.")
            } finally {
                setLoading(false)
            }
        }

        fetchCharacter()
    }, [characterId])

    const goBack = () => router.back()

    if (loading) {
        return (
            <div className="bg-gradient-to-b from-[#0F0F0F] to-[#1a1a2e] text-white min-h-screen">
                <Navbar />
                <div className="container mx-auto px-6 py-16">
                    <Button
                        onClick={goBack}
                        variant="ghost"
                        className="mb-6 text-gray-400 hover:text-white hover:bg-gray-800/50"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <CharacterSkeleton />
                </div>
                <Footer />
            </div>
        )
    }

    if (error || !character) {
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
                        <h2 className="text-2xl font-bold text-red-400 mb-4">
                            Error Loading Character
                        </h2>
                        <p className="text-gray-300 mb-6">{error || "Character not found."}</p>
                        <Button
                            onClick={goBack}
                            variant="outline"
                            className="bg-red-900/50 border-red-700 hover:bg-red-800"
                        >
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

            <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 py-16 relative z-10">
                <Button
                    onClick={goBack}
                    variant="ghost"
                    className="mb-8 text-gray-400 hover:text-white hover:bg-gray-800/50"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Characters
                </Button>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
                    <div className="relative">
                        <div className="relative z-10 bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500"></div>

                            <div className="flex flex-col lg:flex-row">
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
                                                src={character.images.webp.image_url || "/placeholder.svg"}
                                                alt={character.name}
                                                width={350}
                                                height={500}
                                                className="rounded-lg shadow-2xl object-cover w-full h-auto"
                                            />
                                        </div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4, duration: 0.5 }}
                                            className="flex justify-center mt-6"
                                        >
                                            <Badge
                                                variant="outline"
                                                className="bg-yellow-900/30 border-yellow-700 text-yellow-400 px-3 py-1"
                                            >
                                                <Heart className="w-4 h-4 mr-1 inline" fill="currentColor" />{" "}
                                                {character.favorites.toLocaleString()} Favorites
                                            </Badge>
                                        </motion.div>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="lg:w-2/3 p-8"
                                >
                                    <div className="space-y-6">
                                        <div>
                                            <motion.h1
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4, duration: 0.5 }}
                                                className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200"
                                            >
                                                {character.name}
                                            </motion.h1>

                                            <motion.p
                                                initial={{ y: -10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.5, duration: 0.5 }}
                                                className="text-xl text-gray-400 mt-2 font-medium"
                                            >
                                                {character.name_kanji}
                                            </motion.p>
                                        </div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.6, duration: 0.5 }}
                                            className="flex flex-wrap gap-4"
                                        >
                                            {character.birthday && (
                                                <div className="flex items-center bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700">
                                                    <Calendar className="h-5 w-5 text-purple-400 mr-2" />
                                                    <div>
                                                        <p className="text-xs text-gray-400">Birthday</p>
                                                        <p className="font-medium">{character.birthday}</p>
                                                    </div>
                                                </div>
                                            )}

                                            {character.blood_type && (
                                                <div className="flex items-center bg-gray-800/50 rounded-lg px-4 py-2 border border-gray-700">
                                                    <Droplet className="h-5 w-5 text-red-400 mr-2" />
                                                    <div>
                                                        <p className="text-xs text-gray-400">Blood Type</p>
                                                        <p className="font-medium">{character.blood_type}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 30, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.7, duration: 0.5 }}
                                        >
                                            <h2 className="text-xl font-semibold mb-3 text-gray-200">About</h2>
                                            <div className="bg-gray-800/30 rounded-lg p-5 border border-gray-700/50">
                                                <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                                                    {character.about || "No information available."}
                                                </p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    )
}

function CharacterSkeleton() {
    return (
        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800">
            <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 p-6">
                    <Skeleton className="h-[500px] w-full max-w-[350px] rounded-lg" />
                    <div className="flex justify-center mt-6">
                        <Skeleton className="h-8 w-32 rounded-full" />
                    </div>
                </div>

                <div className="lg:w-2/3 p-8 space-y-6">
                    <Skeleton className="h-12 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />

                    <div className="flex flex-wrap gap-4">
                        <Skeleton className="h-16 w-32 rounded-lg" />
                        <Skeleton className="h-16 w-32 rounded-lg" />
                    </div>

                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-40 w-full rounded-lg" />
                    </div>
                </div>
            </div>
        </div>
    )
}