"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Search, Filter, Heart, Star, X } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useDebouncedCallback } from "use-debounce"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Character {
  mal_id: number
  images: { webp: { image_url: string } }
  name: string
  name_kanji: string
  nicknames: string[]
  favorites: number
  about: string
  birthday?: string
  blood_type?: string
}

interface CharacterSectionProps {
  title: string
}

export default function CharacterSection({ title }: CharacterSectionProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams)
    if (term) params.set("query", term)
    else params.delete("query")
    router.replace(`${pathname}?${params.toString()}`)
  }, 300)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const res = await fetch("https://api.jikan.moe/v4/characters")
        const data = await res.json()
        setCharacters(data.data)
      } catch (err) {
        setError("Failed to load characters.")
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
      <div className="min-h-screen flex flex-col">
        <div className="bg-gradient-to-b from-[#0F0F0F] to-[#1a1a2e] py-16 flex-grow">
          {/* Decorative elements */}
          <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="fixed bottom-20 right-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>

          <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="container mx-auto px-4 sm:px-6 relative z-10"
          >
            {/* Header with animated underline */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-6 mb-12"
            >
              <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200">
                {title}
              </h2>
              <div className="relative">
                <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                  Explore our collection of iconic anime characters
                </p>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100px" }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="h-1 bg-gradient-to-r from-yellow-500 to-amber-300 mx-auto mt-4 rounded-full"
                />
              </div>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-4xl mx-auto mb-12"
            >
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 shadow-xl">
                <div className="flex flex-col md:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="text-gray-400" size={18} />
                    </div>

                    <Input
                        type="text"
                        placeholder="Search characters by name..."
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value)
                          handleSearch(e.target.value)
                        }}
                        className="pl-10 bg-gray-800/70 border-gray-700 text-white placeholder:text-gray-400 focus-visible:ring-yellow-500"
                    />

                    {searchTerm && (
                        <button
                            onClick={() => {
                              setSearchTerm("")
                              handleSearch("")
                            }}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-white"
                        >
                          <X size={16} />
                        </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-gray-400" />
                    <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                      <SelectTrigger className="bg-gray-800/70 border-gray-700 focus:ring-yellow-500 w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">All Characters</SelectItem>
                        <SelectItem value="popular">Popular Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {searchTerm && (
                    <div className="mt-4 flex items-center">
                      <Badge variant="outline" className="bg-yellow-900/30 border-yellow-700 text-yellow-400 px-3 py-1">
                        Searching: {searchTerm}
                      </Badge>
                      <span className="ml-2 text-sm text-gray-400">{filteredCharacters.length} results found</span>
                    </div>
                )}
              </div>
            </motion.div>

            {/* Character Grid */}
            {error ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-900/30 text-red-200 p-6 rounded-lg border border-red-800 text-center max-w-2xl mx-auto"
                >
                  <p>{error}</p>
                  <Button
                      onClick={() => window.location.reload()}
                      variant="outline"
                      className="mt-4 bg-red-900/50 border-red-700 hover:bg-red-800 text-white"
                  >
                    Try Again
                  </Button>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {isLoading ? (
                      [...Array(8)].map((_, index) => <CharacterCardSkeleton key={index} />)
                  ) : filteredCharacters.length === 0 ? (
                      <motion.div variants={itemVariants} className="col-span-full text-center py-12">
                        <div className="bg-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-800 max-w-md mx-auto">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-2">No Characters Found</h3>
                          <p className="text-gray-400 mb-4">Try adjusting your search or filter criteria.</p>
                          {searchTerm && (
                              <Button
                                  onClick={() => {
                                    setSearchTerm("")
                                    handleSearch("")
                                  }}
                                  variant="outline"
                                  className="bg-gray-800 hover:bg-gray-700"
                              >
                                Clear Search
                              </Button>
                          )}
                        </div>
                      </motion.div>
                  ) : (
                      filteredCharacters.map((character) => <CharacterCard key={character.mal_id} character={character} />)
                  )}
                </motion.div>
            )}

            {/* Results count */}
            {!isLoading && filteredCharacters.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-12 text-gray-400"
                >
                  Showing {filteredCharacters.length} of {characters.length} characters
                </motion.div>
            )}
          </motion.section>
        </div>
      </div>
  )
}

function CharacterCard({ character }: { character: Character }) {
  return (
      <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { opacity: 1, y: 0 },
          }}
          whileHover={{ y: -8, transition: { duration: 0.2 } }}
          className="h-full"
      >
        <Link href={`/characters/${character.mal_id}`} className="block h-full">
          <div className="relative group h-full overflow-hidden rounded-xl bg-gray-900/60 backdrop-blur-sm border border-gray-800 shadow-lg transition-all duration-300 hover:shadow-yellow-500/10 hover:border-gray-700">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            {/* Image container */}
            <div className="relative h-[280px] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-70"></div>
              <Image
                  src={character.images.webp.image_url || "/placeholder.svg"}
                  alt={character.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Favorites badge */}
              {character.favorites > 0 && (
                  <div className="absolute top-3 right-3 z-20">
                    <Badge
                        variant="outline"
                        className="bg-black/50 backdrop-blur-sm border-yellow-700/50 text-yellow-400 px-2 py-1"
                    >
                      <Heart className="w-3 h-3 mr-1 inline" fill="currentColor" /> {character.favorites.toLocaleString()}
                    </Badge>
                  </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-200 line-clamp-1">
                {character.name}
              </h3>

              {character.name_kanji && <p className="text-sm text-gray-400 font-medium">{character.name_kanji}</p>}

              {/* Nicknames */}
              {character.nicknames && character.nicknames.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {character.nicknames.slice(0, 2).map((nickname, index) => (
                        <Badge key={index} variant="secondary" className="bg-gray-800/80 text-gray-300 text-xs">
                          {nickname}
                        </Badge>
                    ))}
                    {character.nicknames.length > 2 && (
                        <Badge variant="secondary" className="bg-gray-800/80 text-gray-300 text-xs">
                          +{character.nicknames.length - 2} more
                        </Badge>
                    )}
                  </div>
              )}
            </div>

            {/* View details button that appears on hover */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-5 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <div className="text-sm font-medium text-yellow-400 flex items-center justify-center">
                View Details <Star className="ml-1 w-3 h-3" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
  )
}

function CharacterCardSkeleton() {
  return (
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-xl overflow-hidden bg-gray-900/60 backdrop-blur-sm border border-gray-800"
      >
        <Skeleton className="h-[280px] w-full" />
        <div className="p-5 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="pt-2 flex gap-2">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </motion.div>
  )
}

