import Navbar from "@/app/components/navigation";
import ContactForm from "@/app/components/contactform";
import Footer from "@/app/components/footer";

export default function ContactPage() {
    return (
        <div className="bg-[#0F0F0F] text-white min-h-screen">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold text-[#FFD700] mb-8">Contact Us</h1>
                <p className="mb-8 text-gray-300">
                    Have a question or feedback about our anime streaming service? We'd love to hear from you! Fill out the form
                    below and we'll get back to you as soon as possible.
                </p>
                <ContactForm />
            </main>
            <Footer />
        </div>
    )
}

