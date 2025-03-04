import { db } from "@/db/client";
import { animes } from "@/db/anime";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";
import AnimeSection from "@/components/animesection";

export default async function AnimePage() {
    // Haal anime-data op uit de database
    const data = await db.select().from(animes);

    // Transformeer de data om de `rating` naar een number te converteren
    const transformedData = data.map((anime) => ({
        ...anime,
        rating: anime.rating ? parseFloat(anime.rating) : null, // Converteer rating naar number
    }));

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className="mt-5 max-w-7xl mx-auto px-6">
                <AnimeSection title="Populaire Animes" animes={transformedData} />
            </div>
            <Footer />
        </div>
    );
}