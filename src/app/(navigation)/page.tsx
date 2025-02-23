import Navbar from "@/src/components/navigation";
import Homesection from "@/src/components/homesection";
import Footer from "@/src/components/footer";

export default function Homepage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar/>

            <Homesection/>

            <Footer/>
        </div>
    );
}
