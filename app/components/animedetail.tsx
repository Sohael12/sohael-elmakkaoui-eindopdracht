export function AnimeDetail({ anime }: { anime: { title: string; image: string; description: string; video: string } }) {
    return (
        <div className="min-h-screen bg-darkBlue text-primaryText px-6 py-10">
            <h1 className="text-4xl font-bold text-white mb-6">{anime.title}</h1>

            {/* Image */}
            <img
                src={anime.image}
                alt={anime.title}
                className="w-full rounded-lg shadow-lg mb-6"
            />

            {/* Video */}
            <video
                controls
                className="w-full rounded-lg mb-6"
            >
                <source src={anime.video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Description */}
            <p className="text-white">{anime.description}</p>
        </div>
    );
}