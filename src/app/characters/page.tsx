import Navbar from "@/src/components/navigation";
import Footer from "@/src/components/footer";
import CharacterSection from "@/src/components/charactersection";

export default function charachterpage() {
    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />
            <CharacterSection title="Popular Characters" />            <Footer />
        </div>
    )
}
