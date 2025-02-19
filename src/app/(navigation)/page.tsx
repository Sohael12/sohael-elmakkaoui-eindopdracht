import Navbar from "@/app/components/navigation";
import Footer from "@/app/components/footer";
import Homesection from "@/app/components/homesection";

export default function Homepage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar/>

            <Homesection/>

            <Footer/>
        </div>
    );
}
