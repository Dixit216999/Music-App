// MUSIC DATA - Sample music library
const musicData = {
    featuredSongs: [
        {
            id: 1,
            title: "Midnight Dreams",
            artist: "Aurora Waves",
            album: "Nocturnal Vibes",
            duration: "3:45",
            genre: "Electronic",
            coverArt: "assets/cover_midnight_dreams_1764205675038.png",
            audioSrc: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Slow%20Motion.mp3"
        },
        {
            id: 2,
            title: "Neon Lights",
            artist: "Synthwave Collective",
            album: "Retro Future",
            duration: "4:12",
            genre: "Synthwave",
            coverArt: "assets/cover_neon_lights_1764205691275.png",
            audioSrc: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Inspired.mp3"
        },
        {
            id: 3,
            title: "Ocean Breeze",
            artist: "Chill Masters",
            album: "Summer Vibes",
            duration: "3:28",
            genre: "Chillout",
            coverArt: "assets/cover_ocean_breeze_1764205708401.png",
            audioSrc: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Fluffing%20a%20Duck.mp3"
        },
        {
            id: 4,
            title: "Urban Groove",
            artist: "Beat Factory",
            album: "Street Sound",
            duration: "3:55",
            genre: "Hip Hop",
            coverArt: "assets/cover_urban_groove_1764205724264.png",
            audioSrc: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Break%20Time.mp3"
        },
        {
            id: 5,
            title: "Starlight",
            artist: "Dream Pop",
            album: "Celestial",
            duration: "4:33",
            genre: "Pop",
            coverArt: "assets/cover_starlight_1764205745881.png",
            audioSrc: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Bit%20Quest.mp3"
        },
        {
            id: 6,
            title: "Thunder Road",
            artist: "Rock Legends",
            album: "Greatest Hits",
            duration: "5:02",
            genre: "Rock",
            coverArt: "assets/cover_thunder_road_1764205760411.png",
            audioSrc: "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Brandenburg%20Concerto%20No.%204%20in%20G%20-%201st%20Movement.mp3"
        }
    ],

    popularAlbums: [
        {
            id: 1,
            title: "Nocturnal Vibes",
            artist: "Aurora Waves",
            year: 2024,
            trackCount: 12,
            coverArt: "assets/cover_midnight_dreams_1764205675038.png"
        },
        {
            id: 2,
            title: "Retro Future",
            artist: "Synthwave Collective",
            year: 2024,
            trackCount: 10,
            coverArt: "assets/cover_neon_lights_1764205691275.png"
        },
        {
            id: 3,
            title: "Summer Vibes",
            artist: "Chill Masters",
            year: 2023,
            trackCount: 15,
            coverArt: "assets/cover_ocean_breeze_1764205708401.png"
        },
        {
            id: 4,
            title: "Street Sound",
            artist: "Beat Factory",
            year: 2024,
            trackCount: 14,
            coverArt: "assets/cover_urban_groove_1764205724264.png"
        },
        {
            id: 5,
            title: "Celestial",
            artist: "Dream Pop",
            year: 2023,
            trackCount: 11,
            coverArt: "assets/cover_starlight_1764205745881.png"
        },
        {
            id: 6,
            title: "Greatest Hits",
            artist: "Rock Legends",
            year: 2022,
            trackCount: 20,
            coverArt: "assets/cover_thunder_road_1764205760411.png"
        }
    ],

    topArtists: [
        {
            id: 1,
            name: "Aurora Waves",
            genre: "Electronic",
            followers: "2.5M",
            coverArt: "assets/artist_aurora_waves_1764205775892.png"
        },
        {
            id: 2,
            name: "Synthwave Collective",
            genre: "Synthwave",
            followers: "1.8M",
            coverArt: "assets/artist2.jpg"
        },
        {
            id: 3,
            name: "Chill Masters",
            genre: "Chillout",
            followers: "3.2M",
            coverArt: "assets/artist3.jpg"
        },
        {
            id: 4,
            name: "Beat Factory",
            genre: "Hip Hop",
            followers: "4.1M",
            coverArt: "assets/artist4.jpg"
        },
        {
            id: 5,
            name: "Dream Pop",
            genre: "Pop",
            followers: "5.7M",
            coverArt: "assets/artist5.jpg"
        },
        {
            id: 6,
            name: "Rock Legends",
            genre: "Rock",
            followers: "8.9M",
            coverArt: "assets/artist6.jpg"
        }
    ],

    playlists: [
        {
            id: 1,
            name: "My Favorites",
            songIds: [1, 3, 5],
            coverArt: "assets/playlist1.jpg"
        },
        {
            id: 2,
            name: "Workout Mix",
            songIds: [4, 6, 2],
            coverArt: "assets/playlist2.jpg"
        }
    ],

    genres: [
        "Electronic", "Synthwave", "Chillout", "Hip Hop", "Pop", "Rock", "Jazz", "Classical"
    ]
};

// Export for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = musicData;
}
