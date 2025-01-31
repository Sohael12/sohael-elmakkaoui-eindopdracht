// components/AnimeSection.js

'use client';

import { motion } from 'framer-motion';

const AnimeSection = ({ title, animes }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mb-12"
        >
            <h2 className="text-3xl font-semibold text-[#FFD700] mb-6">{title}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {animes.map((anime, index) => (
                    <motion.div
                        key={index}
                        className="relative group"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img
                            src={anime.image}
                            alt={anime.title}
                            className="w-full h-64 object-cover rounded-lg shadow-lg"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg">
                            <a
                                href={anime.link}
                                className="text-white text-xl font-bold hover:underline"
                            >
                                {anime.title}
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default AnimeSection;