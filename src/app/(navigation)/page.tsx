import { Suspense } from 'react';
import Navbar from "@/components/navigation";
import Homesection from "@/components/homesection";
import Footer from "@/components/footer";

export default function Homepage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <Homesection />
            </Suspense>

            <Suspense fallback={<div>Loading...</div>}>
                <Footer />
            </Suspense>
        </div>
    );
}
