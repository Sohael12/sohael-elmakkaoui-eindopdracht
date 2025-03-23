import { Suspense } from "react";
import Navbar from "@/components/navigation";
import CharacterSection from "@/components/charactersection";
import Footer from "@/components/footer";



export default function CharacterPage() {
    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            {/* Wrap client-side components with Suspense for async operations */}
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>

            <main className="pt-10">
                <Suspense fallback={<div>Loading Characters...</div>}>
                    <CharacterSection title="Popular Characters" />
                </Suspense>
            </main>

            <Suspense fallback={<div>Loading Footer...</div>}>
                <Footer />
            </Suspense>
        </div>
    );
}
