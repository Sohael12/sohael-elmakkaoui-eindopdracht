import Navbar from "@/components/navigation"
import Footer from "@/components/footer"
import CharacterSection from "@/components/charactersection";

export default function CharacterPage() {
    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />

            <main className="pt-10">
                <CharacterSection title="Popular Characters" />
            </main>

            <Footer />
        </div>
    )
}

