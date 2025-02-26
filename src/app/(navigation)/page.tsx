import Navbar from "@/components/navigation";
import Homesection from "@/components/homesection";
import Footer from "@/components/footer";


export default function Homepage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar/>

            <Homesection/>

            <Footer/>
        </div>
    );
}
