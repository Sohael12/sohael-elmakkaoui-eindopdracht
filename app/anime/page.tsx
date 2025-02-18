'use client';
import {motion} from 'framer-motion';
import AnimeSection from "@/app/components/animesection";
import animes from "@/app/data";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navigation";

export default function seriePage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar/>

            <motion.h1
                initial={{opacity: 0, y: -20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.8, ease: 'easeOut'}}
                className="text-center text-3xl font-bold mt-20 text-yellow-400"
            >
                Anime Series
            </motion.h1>

            <div className="container mx-auto px-4 py-12">
                <AnimeSection title="All Anime" animes={animes}/>
            </div>

            <Footer/>
        </div>
    );
}