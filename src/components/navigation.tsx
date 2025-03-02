"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LogIn, LogOut, User } from "lucide-react"

export default function Navbar() {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userName, setUserName] = useState("")

    // Check if user is logged in
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me", {
                    method: "GET",
                    credentials: "include",
                })

                if (res.ok) {
                    const data = await res.json()
                    setIsLoggedIn(true)
                    setUserName(data.name || "User")
                } else {
                    setIsLoggedIn(false)
                }
            } catch (error) {
                setIsLoggedIn(false)
            }
        }

        checkAuth()
    }, [])

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            })
            setIsLoggedIn(false)
            router.push("/")
            router.refresh()
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    return (
        <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gray-900 shadow-lg fixed top-0 left-0 w-full z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                        <Link href="/" className="text-white text-3xl font-bold tracking-wide">
                            AnimeHub
                        </Link>
                    </motion.div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-6">
                        {[
                            { name: "Home", href: "/" },
                            { name: "Anime Series", href: "/anime" },
                            { name: "Manga", href: "/manga" },
                            { name: "Characters", href: "/characters" },
                            { name: "Contact", href: "/contact" },
                        ].map((link, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.2, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <Link
                                    href={link.href}
                                    className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center text-yellow-400">
                                    <User className="w-5 h-5 mr-1" />
                                    <span>{userName}</span>
                                </motion.div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleLogout}
                                    className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </motion.button>
                            </>
                        ) : (
                            <>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/login"
                                        className="flex items-center text-white hover:text-yellow-400 transition duration-300"
                                    >
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Login
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link
                                        href="/register"
                                        className="flex items-center bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-lg transition duration-300"
                                    >
                                        Register
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    )
}

