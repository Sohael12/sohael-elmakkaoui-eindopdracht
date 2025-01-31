import Navbar from "@/app/components/information/navigation";
import Footer from "@/app/components/information/footer";
import Homesection from "@/app/components/homecomponent/homesection";

export default function Homepage() {
    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar/>

            <Homesection/>

            <Footer/>
        </div>
    );
}
