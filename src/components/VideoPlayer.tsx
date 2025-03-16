"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Loader } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface VideoPlayerProps {
    videoUrl: string
    title?: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title }) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [isMuted, setIsMuted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const handleLoadedMetadata = () => {
            setDuration(video.duration)
            setIsLoading(false)
        }

        const handleTimeUpdate = () => {
            setCurrentTime(video.currentTime)
        }

        const handleError = () => {
            setError("Er is een fout opgetreden bij het laden van de video.")
            setIsLoading(false)
        }

        video.addEventListener("loadedmetadata", handleLoadedMetadata)
        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("error", handleError)

        return () => {
            video.removeEventListener("loadedmetadata", handleLoadedMetadata)
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("error", handleError)
        }
    }, []) // Only videoRef is needed here

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play()
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    const handleFullscreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen()
        }
    }

    const handleSeek = (value: number[]) => {
        if (videoRef.current) {
            videoRef.current.currentTime = value[0]
            setCurrentTime(value[0])
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, "0")}`
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-500">
                <p>{error}</p>
                <p className="text-sm mt-2">Video URL: {videoUrl}</p>
            </div>
        )
    }

    return (
        <div className="relative w-full rounded-lg overflow-hidden bg-black">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <Loader className="w-8 h-8 animate-spin text-white" />
                </div>
            )}

            <video
                ref={videoRef}
                className="w-full"
                preload="metadata"
                playsInline
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
            >
                <source src={videoUrl} type="video/mp4" />
                <source src={videoUrl} type="video/webm" />
                <p>Je browser ondersteunt geen video weergave.</p>
            </video>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {title && <div className="text-white mb-2 text-sm">{title}</div>}

                <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="mb-4"
                />

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                    </Button>

                    <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                    </Button>

                    <span className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleFullscreen}
                        className="text-white hover:bg-white/20 ml-auto"
                    >
                        <Maximize className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default VideoPlayer

