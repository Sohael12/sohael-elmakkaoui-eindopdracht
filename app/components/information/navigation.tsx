'use client';

import {motion} from 'framer-motion';
import Link from 'next/link';

const navLinks = [
    {name: 'Home', href: '/'},
    {name: 'Anime Series', href: '/series'},
    {name: 'Manga', href: '/manga'},
    {name: 'Characters', href: '/characters'},
    {name: 'Contact', href: '/contact'}
];

export default function Navbar() {
    return (
        <motion.nav
            initial={{opacity: 0, y: -50}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.8, ease: 'easeOut'}}
            className="bg-gradient-to-r from-red-500 to-black shadow-xl fixed top-0 left-0 w-full z-50 border-b-4 border-yellow-400"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <motion.div whileHover={{rotate: 360}} transition={{duration: 0.5}}>
                        <Link href="/" className="text-yellow-400 text-3xl font-bold tracking-wide drop-shadow-lg">
                            🎌 Animeweb
                        </Link>
                    </motion.div>
                    <div className="hidden md:flex space-x-6">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={index}
                                whileHover={{scale: 1.2, rotate: 5}}
                                transition={{type: 'spring', stiffness: 300}}
                            >
                                <Link
                                    href={link.href}
                                    className="text-white text-lg font-semibold hover:text-yellow-300 transition duration-300 uppercase"
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}