export const getAnimeById = (id) => {
    const animes = [
        { id: 1, title: 'Naruto', image: '/images/naruto.jpg', description: 'A ninja journey', video: 'https://www.w3schools.com/html/movie.mp4' },
        { id: 2, title: 'One Piece', image: '/images/onepiece.jpg', description: 'Pirate adventure', video: 'https://www.w3schools.com/html/mov_bbb.mp4' },
        // Add more anime objects here
    ];
    return animes.find((anime) => anime.id === parseInt(id));
};
