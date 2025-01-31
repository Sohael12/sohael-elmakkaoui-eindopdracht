'use client';

import animes from "@/app/data";

export default function Homesection() {
    return (
        <div className="bg-gradient-to-b from-gray-900 to-black text-white min-h-screen">
            {/* Main Content */}
            <main className="pt-20">
                {/* Hero Section */}
                <section className="w-full bg-cover bg-center text-center py-20"
                         style={{backgroundImage: "url('/demon_slayer.jpg')"}}>
                    <div className="bg-black bg-opacity-50 py-12 px-4">
                        <h1 className="text-5xl font-extrabold text-yellow-400">Demon Slayer: Season 4</h1>
                        <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
                            Experience the epic continuation of Tanjiro's journey in the latest season of Demon Slayer.
                            Watch as new challenges and enemies emerge in this thrilling saga.
                        </p>
                        <button
                            className="mt-6 px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
                            Watch Now
                        </button>
                    </div>
                </section>

                {/* Anime Browsing Section */}
                <section className="bg-gray-800 py-12 w-full">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-white mb-6">Browse Anime</h2>

                        {/* Filters */}
                        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
                            {['Genre', 'Sort By', 'Year', 'Rating'].map((filter, index) => (
                                <select
                                    key={index}
                                    className="bg-gray-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-500"
                                >
                                    <option>{filter}</option>
                                </select>
                            ))}
                        </div>

                        {/* Anime Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {animes.map((anime) => (
                                <div key={anime.id}
                                     className="bg-gray-700 rounded-lg shadow-lg p-4 hover:scale-105 transform transition">
                                    <img
                                        src={anime.image}
                                        alt={anime.title}
                                        className="w-full h-40 object-cover rounded-md"
                                    />
                                    <h3 className="text-white font-semibold mt-4">{anime.title}</h3>
                                    <p className="text-gray-300 mt-2">⭐ 4.5 - 2025</p>
                                    <a
                                        href={anime.link}
                                        className="text-yellow-500 hover:underline mt-4 inline-block"
                                    >
                                        Watch Now
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
