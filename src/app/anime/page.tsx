'use client';
import {motion} from 'framer-motion';
import AnimeSection from "@/src/components/animesection";
import animes from "@/src/lib/data";
import Footer from "@/src/components/footer";
import Navbar from "@/src/components/navigation";

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
