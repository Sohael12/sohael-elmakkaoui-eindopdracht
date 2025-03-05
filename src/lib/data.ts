const animes = [
    {
        id: 1,
        title: "Solo leveling",
        image:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/higlight/fotos/solleveling-BUyIZsF0UfFPHPtzfJrqkC6yXdvKxX.jpg",
        highlightVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/videos/%5BSubsPlease%5D%20Saikyou%20Tank%20no%20Meikyuu%20Kouryaku%20-%2001%20(1080p)%20%5B38326098%5D.mkv-lfu7DysezzV7L27whqZ476RvfMPYHR.mp4",
        fullEpisodeVideo:
            "ttps://abhblbyqaqa2f0hfu.public.blob.vercel-storage.com/videos/%5BSubsPlease%5D%20Saikyou%20Tank%20no%20Meikyuu%20Kouryaku%20-%2001%20(1080p)%20%5B38326098%5D.mkv-lfu7DysezzV7L27whqZ476RvfMPYHR.mp4",
        rating: 8.7,
        genre: ["Action", "Fantasy"],
        description:
            "In a world where hunters must battle deadly monsters to protect humanity, a powerless hunter named Sung Jin-Woo finds himself in a mysterious dungeon that changes his life forever.",
    },
    {
        id: 2,
        title: "One Piece",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/images/onepiece-5jjUzEtog1Lf0Ug6APjEIMjve8jJpD.jpg",
        highlightVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/higlight/onepiceopening-JaKrkXWd0Y12jMCGDkgJEQGgKW8ONb",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/one-piece-episode1-kLmN8pQrStU3vWxYzA2B1cDfEgHiJo.mp4",
        rating: 8.9,
        genre: ["Action", "Fantasy"],
        description:
            "Monkey D. Luffy sets out on a journey to find the legendary treasure One Piece and become the Pirate King.",
    },
    {
        id: 3,
        title: "Jujutsu Kaisen",
        image:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/images/jujustus%20kaisen-xCUDAsgdWqn68wltfu9YCySDFvS0aX.jpg",
        highlightVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/higlight/jujustsunkasienopening-cmCmgrRCNoJPPxaHTTRMI22zSCvfNB",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/jujutsu-kaisen-episode1-a7b2e7a2-e50f-410a-a19f-6a68e226e78a.mp4",
        rating: 8.6,
        genre: ["Action", "Fantasy"],
        description:
            "Yuji Itadori joins a secret organization of Jujutsu Sorcerers to eliminate a powerful Curse named Ryomen Sukuna, of whom Yuji becomes the host.",
    },
    {
        id: 4,
        title: "Attack on Titan",
        image:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/images/attackontitan-tuTcReyeKj7OFTNQ2atkG6YyeVMmy7",
        highlightVideo: "https://www.w3schools.com/html/movie.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/attack-on-titan-episode1-e8d7648a-229f-4296-929f-706a666a520a.mp4",
        rating: 9.0,
        genre: ["Action", "Fantasy"],
        description:
            "In a world where humanity lives inside cities surrounded by enormous walls due to the Titans, gigantic humanoid creatures who devour humans seemingly without reason, a young boy named Eren Yeager vows to exterminate them after a Titan brings about the destruction of his hometown and the death of his mother.",
    },
    {
        id: 5,
        title: "Spy x Family",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/spyjpg-k69GttMks4BycJfJiwFvIrDvTq0a3a.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/spy-x-family-episode1-a1b2c3d4-e5f6-7890-1234-567890abcdef.mp4",
        rating: 8.5,
        genre: ["Action", "Fantasy"],
        description:
            "A spy on an undercover mission gets married and adopts a child as part of his cover. His wife and daughter have secrets of their own, and all three must strive to keep together.",
    },
    {
        id: 6,
        title: "Blue Lock",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/images/bluelock-9OyMpgsZg5NozkQkUeaO1rRH65tdP8.jpg",
        highlightVideo: "https://www.w3schools.com/html/movie.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/blue-lock-episode1-f7e6d5c4-b9a8-7654-3210-fedcba987654.mp4",
        rating: 8.2,
        genre: ["Sports, Psychological"],
        description:
            "After a disastrous defeat at the 2018 World Cup, Japan's team struggles to regroup. But what's missing? An absolute Ace Striker, who can guide them to the win. The Japan Football Union is hell-bent on creating a striker who hungers for goals and thirsts for victory, and who can be the decisive instrument in turning around a losing match...and to do so, they've gathered 300 of Japan's best and brightest youth players. Who will emerge to lead the team...and will they be able to out-muscle and out-ego everyone who stands in their way?",
    },
    {
        id: 7,
        title: "My Hero Academia",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/images-YYs4i56I70X0rkk3Fo9wHFgvammvrD.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/my-hero-academia-episode1-1a2b3c4d-5e6f-7890-1234-567890abcdef.mp4",
        rating: 8.4,
        genre: ["Action", "Fantasy"],
        description:
            'In a world where people with superpowers (known as "Quirks") are the norm, a boy without powers dreams of enrolling in a prestigious hero academy and learning what it really means to be a hero.',
    },
    {
        id: 8,
        title: "Tokyo Revengers",
        image:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/Tokyo%20Revengers-VKO71fTdul8qzMjdf3WiosuLtsclrU.jpg",
        highlightVideo: "https://www.w3schools.com/html/movie.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/tokyo-revengers-episode1-98765432-10fedcba-9876-543210fedcba.mp4",
        rating: 8.1,
        genre: ["Action", "Fantasy"],
        description:
            "Takemichi Hanagaki learns that his girlfriend from way back in middle school, Hinata Tachibana, has died. When he finds out he has the ability to travel through time, he decides to go back to his middle school years and change the future to save Hinata.",
    },
    {
        id: 9,
        title: "Fullmetal Alchemist: Brotherhood",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/Fullmetal-JE8dG2M1PuWxsX2u2POCvSWfdibyO7.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/fullmetal-alchemist-brotherhood-episode1-fedcba98-7654-3210-fedcba98-76543210fedcb.mp4",
        rating: 9.1,
        genre: ["Action", "Fantasy"],
        description:
            "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes awry and leaves them in damaged physical forms.",
    },
    {
        id: 10,
        title: "Naruto Shippuden",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/naruto-mtCbuYa3kYZOy8fOZ78bhZyRAlhBY5.jpg",
        highlightVideo: "https://www.w3schools.com/html/movie.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/naruto-shippuden-episode1-12345678-90abcdef-1234-567890abcdef.mp4",
        rating: 8.7,
        genre: ["Action", "Fantasy"],
        description:
            "Naruto Uzumaki, is a loud, hyperactive, adolescent ninja who constantly searches for approval and recognition, as well as to become Hokage, who is acknowledged as the leader and strongest of all ninja in the village.",
    },
    {
        id: 11,
        title: "Hunter x Hunter",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/hunter-fxlVkpWIlPVxhPamjuIiDLNlQIDwGb.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/hunter-x-hunter-episode1-abcdef12-34567890-abcdef12-34567890.mp4",
        rating: 9.0,
        genre: ["Action", "Fantasy"],
        description:
            "Gon Freecss aspires to become a Hunter, an exceptional being capable of greatness. With his friends and his potential, he seeks for his father who left him when he was younger.",
    },
    {
        id: 12,
        title: "Death Note",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/death-xoBnPMp7Fbr1XnZCIQvcDTfeGzSuwy.jpg",
        highlightVideo: "https://www.w3schools.com/html/movie.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/death-note-episode1-09876543-21fedcba-0987-654321fedcba.mp4",
        rating: 8.6,
        genre:  ["Mystery, Psychological Thriller"],
        description:
            "An intelligent high school student goes on a secret crusade to eliminate criminals from the world after discovering a notebook capable of killing anyone whose name is written into it.",
    },
    {
        id: 13,
        title: "Dragon Ball Z",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/dragonball-MU3Ih3plYjChkPAN3i9ku7DiG5u8x6.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/dragon-ball-z-episode1-fedcba98-7654-3210-fedcba98-76543210fedcb.mp4",
        rating: 8.7,
        genre: ["Action", "Fantasy"],
        description:
            "After learning that he is from another planet, a warrior named Goku and his friends are prompted to defend it from an onslaught of extraterrestrial enemies.",
    },
    {
        id: 15,
        title: "Weathering with You",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/weathering_-jrDra21CnTJjzFGu6kM3LP3cUQRVFl.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/weathering-with-you-episode1-1a2b3c4d-5e6f-7890-1234-567890abcdef.mp4",
        rating: 8.3,
        genre: ["Romance, Supernatural"],
        description:
            "A high school boy who has run away to Tokyo befriends a girl who appears to be able to manipulate the weather.",
    },
    {
        id: 18,
        title: "Bleach",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/bleach-18lISw6FjLFaSuOvjbqfe0zGfc75Cw.jpg",
        highlightVideo: "https://www.w3schools.com/html/movie.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/bleach-episode1-98765432-10fedcba-9876-543210fedcba.mp4",
        rating: 8.2,
        genre: ["Action", "Fantasy"],
        description:
            'High school student Ichigo Kurosaki, who has the ability to see ghosts, gains soul reaper powers from Rukia Kuchiki and sets out to save the world from "Hollows".',
    },
    {
        id: 19,
        title: "One Punch Man",
        image: "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/one-KtsgwSgzQSWZjj8vCuK8sYamlcEGLG.jpg",
        highlightVideo: "https://www.w3schools.com/html/mov_bbb.mp4",
        fullEpisodeVideo:
            "https://abblbyqaqa2f0hfu.public.blob.vercel-storage.com/full-episodes/one-punch-man-episode1-abcdef12-34567890-abcdef12-34567890.mp4",
        rating: 8.8,
        genre: ["Action", "Fantasy"],
        description: "The story of Saitama, a hero that does it just for fun & can defeat his enemies with a single punch.",
    },
]

export default animes

