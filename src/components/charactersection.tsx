"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Search, Heart } from "lucide-react"

interface Character {
  mal_id: number
  images: {
    webp: {
      image_url: string
    }
  }
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
  birthdate?: string
  height?: string
  weight?: string
  blood_type?: string
  planet_of_origin?: string
}

interface CharacterSectionProps {
  title: string
}

export default function CharacterSection({ title }: CharacterSectionProps) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch("/api/characters")
        const data = await response.json()
        setCharacters(data.data)
      } catch (err) {
        setError("Failed to load characters")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCharacters()
  }, [])

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch =
        character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        character.nicknames.some((nickname) => nickname.toLowerCase().includes(searchTerm.toLowerCase()))

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "popular") return matchesSearch && character.favorites > 1000
    return matchesSearch
  })

  if (error) {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg">{error}</div>
        </div>
    )
  }

  return (
      <div className="bg-gradient-to-b from-gray-900 to-black py-12">
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="container mx-auto px-6 space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-yellow-400">{title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover and learn more about your favorite anime characters. Click on any character to view their details.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                  type="text"
                  placeholder="Search characters..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div className="flex gap-2">
              <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="all">All Characters</option>
                <option value="popular">Popular</option>
              </select>
            </div>
          </div>

          {/* Character Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {isLoading
                ? [...Array(8)].map((_, index) => (
                    <div key={index} className="rounded-lg overflow-hidden bg-gray-800/50">
                      <div className="h-[300px] bg-gray-700/50 animate-pulse" />
                      <div className="p-4 space-y-3">
                        <div className="h-6 bg-gray-700/50 rounded w-2/3 animate-pulse" />
                        <div className="h-4 bg-gray-700/50 rounded w-1/2 animate-pulse" />
                      </div>
                    </div>
                ))
                : filteredCharacters.map((character) => (
                    <motion.div
                        key={character.mal_id}
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="group"
                    >
                      <div className="rounded-lg overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm">
                        <div className="relative h-[300px] overflow-hidden">
                          <Image
                              src={character.images.webp.image_url || "/placeholder.svg"}
                              alt={character.name}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              priority={character.mal_id <= 4}
                          />
                        </div>
                        <div className="p-4 space-y-3">
                          <h3 className="text-lg font-semibold text-white truncate">{character.name}</h3>
                          {character.name_kanji && <p className="text-sm text-gray-400">{character.name_kanji}</p>}
                        </div>
                      </div>
                    </motion.div>
                ))}
          </div>
        </motion.section>
      </div>
  )
}