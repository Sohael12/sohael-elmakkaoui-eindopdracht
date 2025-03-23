"use client"

import type React from "react"
import {motion} from "framer-motion"
import Link from "next/link"
import {useEffect, useRef, useState} from "react"
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "@/components/ui/card"
import {Progress} from "@/components/ui/progress"
import {Star, Play, Info, Volume2, VolumeX} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip"

export interface Anime {
    id: string
    title: string
    image: string | null
    highlightVideo: string | null
    fullEpisodeVideo: string | null
    rating: number | null
    genre: string | null
    description: string | null
}

interface VideoPlayerProps {
    anime: Anime
}

export interface AnimeSectionProps {
    title: string
    animes: Anime[]
}

const AnimeSection: React.FC<AnimeSectionProps> = ({title, animes}) => {
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    }
    const itemVariants = {
        hidden: {opacity: 0, y: 30},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, margin: "-100px"}}
            variants={containerVariants}
            className="w-full space-y-8 px-4 md:px-8 py-8 mt-16"
        >

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="relative">
                    <motion.h2
                        variants={{
                            hidden: {opacity: 0, y: -20},
                            visible: {opacity: 1, y: 0, transition: {duration: 0.6}},
                        }}
                        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#FFD700] via-[#FFC800] to-[#FFA500] bg-clip-text text-transparent"
                    >
                        {title}
                    </motion.h2>
                    <motion.div
                        initial={{width: 0}}
                        animate={{width: "40%"}}
                        transition={{delay: 0.3, duration: 0.8}}
                        className="h-1 bg-gradient-to-r from-[#FFD700] to-[#FFA500] mt-2 rounded-full"
                    />
                </div>

                <motion.div
                    variants={{
                        hidden: {opacity: 0, x: 20},
                        visible: {opacity: 1, x: 0, transition: {duration: 0.6}},
                    }}
                >
                </motion.div>
            </div>

            {/* Anime grid */}
            <motion.div variants={containerVariants}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
                {animes.map((anime) => (
                    <motion.div
                        key={anime.id}
                        variants={itemVariants}
                        whileHover={{y: -8, transition: {duration: 0.3}}}
                        className="h-full"
                    >
                        <Card
                            className="h-full bg-black/40 backdrop-blur-lg border-[#FFD700]/20 hover:border-[#FFD700]/50 transition-all duration-300 overflow-hidden group relative">
                            {/* Glow effect on hover */}
                            <div
                                className="absolute inset-0 bg-gradient-to-b from-[#FFD700]/0 to-[#FFD700]/0 group-hover:from-[#FFD700]/5 group-hover:to-[#FFD700]/0 transition-all duration-500"></div>

                            <CardHeader className="relative p-0 overflow-hidden rounded-t-lg">
                                <VideoPlayer anime={anime}/>
                            </CardHeader>

                            <CardContent className="p-4 space-y-3 relative z-10">
                                <CardTitle
                                    className="text-xl font-bold text-white line-clamp-1 group-hover:text-[#FFD700] transition-colors duration-300">
                                    {anime.title}
                                </CardTitle>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700"/>
                                        <span
                                            className="text-sm text-white/80">{anime.rating?.toFixed(1) || "N/A"}</span>
                                    </div>

                                    {anime.genre && (
                                        <Badge variant="outline"
                                               className="bg-black/50 border-[#FFD700]/30 text-[#FFD700] text-xs">
                                            {anime.genre}
                                        </Badge>
                                    )}
                                </div>

                                {anime.description &&
                                    <p className="text-xs text-white/60 line-clamp-2 mt-2">{anime.description}</p>}
                            </CardContent>


                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </motion.section>
    )
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({anime}) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [progress, setProgress] = useState(0)
    const [isHovered, setIsHovered] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(true)
    const [duration, setDuration] = useState(0)
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const updateProgress = () => {
            setProgress((video.currentTime / video.duration) * 100)
            setCurrentTime(video.currentTime)
        }

        const handleLoadedMetadata = () => {
            setDuration(video.duration)
        }

        video.addEventListener("timeupdate", updateProgress)
        video.addEventListener("loadedmetadata", handleLoadedMetadata)

        return () => {
            video.removeEventListener("timeupdate", updateProgress)
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        }
    }, [])

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    const handlePlayPause = (e: React.MouseEvent) => {
        e.stopPropagation()
        const video = videoRef.current
        if (!video) return

        if (video.paused) {
            video.play()
            setIsPlaying(true)
        } else {
            video.pause()
            setIsPlaying(false)
        }
    }

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation()
        const video = videoRef.current
        if (!video) return

        video.muted = !video.muted
        setIsMuted(video.muted)
    }

    return (
        <div
            className="relative h-64 w-full group/video"
            onMouseEnter={() => {
                setIsHovered(true)
                if (anime.highlightVideo) {
                    videoRef.current?.play()
                    setIsPlaying(true)
                }
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                if (anime.highlightVideo) {
                    videoRef.current?.pause()
                    setIsPlaying(false)
                }
            }}
        >
            {/* Video or poster image */}
            <video
                ref={videoRef}
                src={anime.highlightVideo || undefined}
                className="h-full w-full object-cover transition-transform duration-700 group-hover/video:scale-105"
                poster={anime.image || "/default-anime.jpg"}
                muted={isMuted}
                playsInline
                loop
            />

            {/* Gradient overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"/>

            {/* No video placeholder */}
            {!anime.highlightVideo && (
                <div
                    className="absolute inset-0 bg-gradient-to-br from-[#FFD700]/20 to-[#FFA500]/20 flex items-center justify-center">
                    <div className="bg-black/50 p-4 rounded-full backdrop-blur-sm">
                        <Play className="w-10 h-10 text-[#FFD700]" fill="#FFD700"/>
                    </div>
                </div>
            )}

            {/* Progress bar */}
            {anime.highlightVideo && (
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="flex items-center px-3 py-1 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="text-xs text-white/70 mr-2">{formatTime(currentTime)}</div>
                        <Progress value={progress} className="h-1 flex-grow bg-white/20 rounded-full overflow-hidden"/>
                        <div className="text-xs text-white/70 ml-2">{formatTime(duration)}</div>
                    </div>
                </div>
            )}

            {/* Hover controls */}
            {isHovered && anime.highlightVideo && (
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.2}}
                    className="absolute inset-0 flex flex-col items-center justify-center"
                >
                    <div className="flex items-center gap-3">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/10 h-12 w-12"
                                        onClick={handlePlayPause}
                                    >
                                        {isPlaying ? (
                                            <div className="w-4 h-8 flex items-center justify-center">
                                                <div className="w-1 h-8 bg-[#FFD700] mx-0.5"></div>
                                                <div className="w-1 h-8 bg-[#FFD700] mx-0.5"></div>
                                            </div>
                                        ) : (
                                            <Play className="w-6 h-6 text-[#FFD700]" fill="#FFD700"/>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isPlaying ? "Pause" : "Play"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>

                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm border border-white/10 h-8 w-8"
                                        onClick={toggleMute}
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-4 h-4 text-white/80"/>
                                        ) : (
                                            <Volume2 className="w-4 h-4 text-[#FFD700]"/>
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{isMuted ? "Unmute" : "Mute"}</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>

                    <Link href={`/anime/${anime.id}`} className="absolute bottom-12 right-3">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs bg-black/50 hover:bg-black/70 backdrop-blur-sm text-white/80 hover:text-white"
                        >
                            <Info className="w-3 h-3 mr-1"/> Details
                        </Button>
                    </Link>
                </motion.div>
            )}

            {/* Genre badge */}
            {anime.genre && (
                <div className="absolute top-3 left-3 z-10">
                    <Badge
                        className="bg-black/70 backdrop-blur-sm text-[#FFD700] border-[#FFD700]/30 text-xs font-medium">
                        {anime.genre}
                    </Badge>
                </div>
            )}
        </div>
    )
}

export default AnimeSection

