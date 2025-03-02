"use client";

import {useState} from "react";
import {motion} from "framer-motion";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {Mail, Lock, Loader2, AlertCircle} from "lucide-react";
import Navbar from "@/components/navigation";
import Footer from "@/components/footer";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // Verzend de gegevens naar de API voor login
            const res = await fetch("/api/login", {  // Correct the URL here
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
                credentials: "include", // Zorgt ervoor dat cookies worden meegestuurd
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to login");
            }

            // Bij een succesvolle login, doorsturen naar de homepagina
            router.push("/");  // Redirect to home on success
        } catch (err) {
            console.error(err); // Log full error for debugging
            setError(err instanceof Error ? err.message : "Failed to login");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar/>
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-bold text-center text-white">Log In</h1>
                    {error && (
                        <motion.div
                            initial={{opacity: 0, y: -10}}
                            animate={{opacity: 1, y: 0}}
                            className="p-3 rounded-lg bg-red-500/10 border border-red-500/50 flex items-center gap-2 text-red-500"
                        >
                            <AlertCircle className="w-4 h-4"/>
                            <p className="text-sm">{error}</p>
                        </motion.div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-white placeholder-gray-400"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isLoading}
                            whileHover={{scale: 1.02}}
                            whileTap={{scale: 0.98}}
                            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold py-3 rounded-lg hover:from-yellow-400 hover:to-yellow-500 transition duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin"/>
                                    Logging in...
                                </>
                            ) : (
                                "Log In"
                            )}
                        </motion.button>
                    </form>
                    <p className="text-center text-gray-400 text-sm">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-yellow-500 hover:text-yellow-400">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <Footer/>
        </>

    );
}
