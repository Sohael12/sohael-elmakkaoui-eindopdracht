"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import animes from "@/app/data"
import Navbar from "@/app/components/navigation"
import Footer from "@/app/components/footer"

interface Anime {
    id: number
    title: string
    image: string
    highlightVideo: string
    fullEpisodeVideo: string
    description: string
    rating: number
    genre: string
    related?: string[]
}

const AnimeDetail = () => {
    const params = useParams()
    const [anime, setAnime] = useState<Anime | null>(null)

    useEffect(() => {
        const id = params?.id
        if (id) {
            const animeId = Array.isArray(id) ? id[0] : id
            const selectedAnime = animes.find((a) => a.id === Number.parseInt(animeId, 10))
            setAnime(selectedAnime || null)
        }
    }, [params])

    if (!anime) {
        return <div className="text-white text-center py-20">Anime niet gevonden!</div>
    }

    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold">{anime.title}</h1>
                <div className="mt-6">
                    <video
                        src={anime.fullEpisodeVideo}
                        className="w-full h-96 object-cover rounded-lg shadow-lg"
                        poster={anime.image}
                        controls
                    />
                </div>
                <div className="mt-4 flex gap-2">
                    <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">Episode 1</button>
                    <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">Episode 2</button>
                    <button className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">Episode 3</button>
                </div>
                <div className="mt-6 bg-gray-900 p-4 rounded-lg">
                    <p className="text-gray-300">{anime.description}</p>
                </div>
                <div className="mt-6">
                    <input
                        type="text"
                        placeholder="Voeg een reactie toe..."
                        className="w-full bg-gray-800 text-white p-2 rounded-lg"
                    />
                </div>
                <div className="mt-6 flex justify-between items-center bg-gray-900 p-4 rounded-lg">
                    <p>⭐ {anime.rating.toFixed(1)}/10</p>
                    <p>{anime.genre}</p>
                    <select className="bg-gray-800 p-2 rounded-lg">
                        <option>English (Sub)</option>
                        <option>Japanese (Sub)</option>
                        <option>Japanese (Dub)</option>
                    </select>
                </div>
                {anime.related && anime.related.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold">Gerelateerde Anime</h2>
                        <div className="grid grid-cols-4 gap-4 mt-4">
                            {anime.related.map((relatedAnime, index) => (
                                <div key={index} className="bg-gray-900 p-4 rounded-lg">
                                    <p className="text-gray-300">{relatedAnime}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default AnimeDetail

