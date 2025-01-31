export default function Footer() {
    return (
        <footer className="bg-gray-900 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
                <div className="flex justify-center space-x-8 mb-4">
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        Twitter
                    </a>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        Discord
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
                        Instagram
                    </a>
                </div>
                <p className="text-sm">© 2025 AnimeHub. All rights reserved.</p>
            </div>
        </footer>
    );
}
