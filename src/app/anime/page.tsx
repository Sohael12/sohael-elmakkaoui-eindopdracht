'use client';
import {motion} from 'framer-motion';
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import AnimeSection from "@/components/animesection";
import animes from "@/lib/data";

export default function SeriePage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar/>

            <main className="pt-20 px-4 md:px-8">
                <motion.h2
                    className="text-center text-4xl font-bold text-yellow-400 mb-8"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.6}}
                >
                    All Anime
                </motion.h2>

                <AnimeSection animes={animes}/>
            </main>

            {/* Footer */}
            <Footer/>
        </div>
    );
}
