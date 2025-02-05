'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';
import {useEffect, useRef} from 'react';

const AnimeSection = ({title, animes}) => {
    return (
        <motion.div
            initial={{opacity: 0, y: 50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.6, ease: 'easeOut'}}
            className="mb-12"
        >
            <h2 className="text-3xl font-semibold text-[#FFD700] mb-6">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animes.map((anime) => (
                    <motion.div
                        key={anime.id}
                        className="relative group"
                        whileHover={{scale: 1.05}}
                        transition={{duration: 0.3}}
                    >
                        <VideoPlayer anime={anime}/>

                        {/* ✅ Titel onder de video blijft hetzelfde */}
                        <div className="mt-3 text-center">
                            <Link href={`/anime/${anime.id}`} className="block">
                                <span className="text-white text-lg font-semibold hover:text-[#FFD700] transition">
                                    {anime.title}
                                </span>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const VideoPlayer = ({anime}) => {
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.addEventListener('loadeddata', () => {
                video.currentTime = 0.1; // Laat de eerste frame zien
            });
        }
    }, []);

    return (
        <video
            ref={videoRef}
            src={anime.video}
            className="w-full h-64 object-cover rounded-lg shadow-lg"
            poster={anime.image}
            muted
            playsInline
            onMouseEnter={(e) => e.target.play()}
            onMouseLeave={(e) => e.target.pause()}
        />
    );
};

export default AnimeSection;
