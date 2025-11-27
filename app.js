// ==========================================
// MUSIC PLAYER APPLICATION
// ==========================================

// State Management
const state = {
    currentSong: null,
    currentSongIndex: -1,
    isPlaying: false,
    volume: 0.7,
    isMuted: false,
    shuffle: false,
    repeat: 'off', // 'off', 'all', 'one'
    queue: [],
    playlists: [],
    favorites: []
};

// DOM Elements
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeFill = document.getElementById('volumeFill');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const playerTitle = document.getElementById('playerTitle');
const playerArtist = document.getElementById('playerArtist');
const playerCover = document.getElementById('playerCover');
const favoriteBtn = document.getElementById('favoriteBtn');
const searchInput = document.getElementById('searchInput');

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    loadFavorites();
    loadPlaylists();
    renderFeaturedSongs();
    renderAlbums();
    renderArtists();
    renderGenres();
    renderPlaylists();
    setupEventListeners();

    // Set initial volume
    audioPlayer.volume = state.volume;
});

function initializeApp() {
    console.log('🎵 Vibefy Music Player Initialized');
    state.queue = [...musicData.featuredSongs];
}

// ==========================================
// RENDER FUNCTIONS
// ==========================================
function renderFeaturedSongs() {
    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = '';

    musicData.featuredSongs.forEach((song, index) => {
        const card = createSongCard(song, index);
        grid.appendChild(card);
    });
}

function renderAlbums() {
    const grid = document.getElementById('albumsGrid');
    grid.innerHTML = '';

    musicData.popularAlbums.forEach(album => {
        const card = createAlbumCard(album);
        grid.appendChild(card);
    });
}

function renderArtists() {
    const grid = document.getElementById('artistsGrid');
    grid.innerHTML = '';

    musicData.topArtists.forEach(artist => {
        const card = createArtistCard(artist);
        grid.appendChild(card);
    });
}

function renderGenres() {
    const grid = document.getElementById('genresGrid');
    grid.innerHTML = '';

    const genreColors = [
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
    ];

    musicData.genres.forEach((genre, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.background = genreColors[index % genreColors.length];
        card.style.minHeight = '120px';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.justifyContent = 'center';
        card.innerHTML = `
      <h3 style="color: white; margin: 0; font-size: 1.25rem;">${genre}</h3>
    `;
        card.addEventListener('click', () => filterByGenre(genre));
        grid.appendChild(card);
    });
}

function renderPlaylists() {
    const grid = document.getElementById('playlistsGrid');
    grid.innerHTML = '';

    state.playlists.forEach(playlist => {
        const card = createPlaylistCard(playlist);
        grid.appendChild(card);
    });

    if (state.playlists.length === 0) {
        grid.innerHTML = '<p style="color: var(--color-text-muted); grid-column: 1/-1;">No playlists yet. Create your first one!</p>';
    }
}

// ==========================================
// CARD CREATORS
// ==========================================
function createSongCard(song, index) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
    <div class="card-image">
      <img src="${song.coverArt}" alt="${song.title}" onerror="this.src='https://via.placeholder.com/300x300/667eea/ffffff?text=${encodeURIComponent(song.title)}'">
      <div class="play-overlay">
        <i class="fas fa-play"></i>
      </div>
    </div>
    <div class="card-title">${song.title}</div>
    <div class="card-subtitle">${song.artist}</div>
  `;

    card.addEventListener('click', () => playSong(index));
    return card;
}

function createAlbumCard(album) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
    <div class="card-image">
      <img src="${album.coverArt}" alt="${album.title}" onerror="this.src='https://via.placeholder.com/300x300/764ba2/ffffff?text=${encodeURIComponent(album.title)}'">
      <div class="play-overlay">
        <i class="fas fa-play"></i>
      </div>
    </div>
    <div class="card-title">${album.title}</div>
    <div class="card-subtitle">${album.artist} • ${album.year}</div>
  `;

    return card;
}

function createArtistCard(artist) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    card.innerHTML = `
    <div class="card-image" style="border-radius: 50%;">
      <img src="${artist.coverArt}" alt="${artist.name}" onerror="this.src='https://via.placeholder.com/300x300/f5576c/ffffff?text=${encodeURIComponent(artist.name)}'">
      <div class="play-overlay">
        <i class="fas fa-user"></i>
      </div>
    </div>
    <div class="card-title">${artist.name}</div>
    <div class="card-subtitle">${artist.followers} followers</div>
  `;

    return card;
}

function createPlaylistCard(playlist) {
    const card = document.createElement('div');
    card.className = 'card fade-in';
    const songCount = playlist.songs ? playlist.songs.length : 0;

    card.innerHTML = `
    <div class="card-image">
      <img src="${playlist.coverArt || 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=Playlist'}" alt="${playlist.name}">
      <div class="play-overlay">
        <i class="fas fa-play"></i>
      </div>
    </div>
    <div class="card-title">${playlist.name}</div>
    <div class="card-subtitle">${songCount} songs</div>
  `;

    return card;
}

// ==========================================
// PLAYER CONTROLS
// ==========================================
function playSong(index) {
    if (index < 0 || index >= state.queue.length) return;

    state.currentSongIndex = index;
    state.currentSong = state.queue[index];

    // Update player UI
    playerTitle.textContent = state.currentSong.title;
    playerArtist.textContent = state.currentSong.artist;
    playerCover.src = state.currentSong.coverArt;
    playerCover.onerror = () => {
        playerCover.src = `https://via.placeholder.com/100x100/667eea/ffffff?text=${encodeURIComponent(state.currentSong.title)}`;
    };

    // Update favorite button
    updateFavoriteButton();

    // Load and play audio
    if (state.currentSong.audioSrc) {
        audioPlayer.src = state.currentSong.audioSrc;
        audioPlayer.load();

        // Play with promise handling
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    state.isPlaying = true;
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                })
                .catch(error => {
                    console.error('Playback error:', error);
                    state.isPlaying = false;
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                });
        }
    }
}

function play() {
    const playPromise = audioPlayer.play();
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                state.isPlaying = true;
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            })
            .catch(error => {
                console.error('Play error:', error);
            });
    }
}

function pause() {
    audioPlayer.pause();
    state.isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function togglePlayPause() {
    if (state.currentSong === null) {
        playSong(0);
    } else {
        if (state.isPlaying) {
            pause();
        } else {
            play();
        }
    }
}

function playNext() {
    let nextIndex;

    if (state.shuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length);
    } else {
        nextIndex = (state.currentSongIndex + 1) % state.queue.length;
    }

    playSong(nextIndex);
}

function playPrevious() {
    let prevIndex;

    if (state.shuffle) {
        prevIndex = Math.floor(Math.random() * state.queue.length);
    } else {
        prevIndex = state.currentSongIndex - 1;
        if (prevIndex < 0) prevIndex = state.queue.length - 1;
    }

    playSong(prevIndex);
}

function toggleShuffle() {
    state.shuffle = !state.shuffle;
    shuffleBtn.style.color = state.shuffle ? 'var(--color-primary)' : 'var(--color-text-secondary)';
}

function toggleRepeat() {
    const repeatStates = ['off', 'all', 'one'];
    const currentIndex = repeatStates.indexOf(state.repeat);
    state.repeat = repeatStates[(currentIndex + 1) % repeatStates.length];

    if (state.repeat === 'off') {
        repeatBtn.style.color = 'var(--color-text-secondary)';
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    } else if (state.repeat === 'all') {
        repeatBtn.style.color = 'var(--color-primary)';
        repeatBtn.innerHTML = '<i class="fas fa-repeat"></i>';
    } else {
        repeatBtn.style.color = 'var(--color-primary)';
        repeatBtn.innerHTML = '<i class="fas fa-repeat-1"></i>';
    }
}

function toggleFavorite() {
    if (!state.currentSong) return;

    const songId = state.currentSong.id;
    const index = state.favorites.indexOf(songId);

    if (index === -1) {
        state.favorites.push(songId);
    } else {
        state.favorites.splice(index, 1);
    }

    saveFavorites();
    updateFavoriteButton();
}

function updateFavoriteButton() {
    if (!state.currentSong) return;

    const isFavorite = state.favorites.includes(state.currentSong.id);
    favoriteBtn.innerHTML = isFavorite
        ? '<i class="fas fa-heart"></i>'
        : '<i class="far fa-heart"></i>';
    favoriteBtn.classList.toggle('active', isFavorite);
}

// ==========================================
// VOLUME CONTROLS
// ==========================================
function setVolume(volume) {
    state.volume = Math.max(0, Math.min(1, volume));
    audioPlayer.volume = state.volume;
    volumeFill.style.width = `${state.volume * 100}%`;

    // Update volume icon
    if (state.volume === 0) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
    } else if (state.volume < 0.5) {
        volumeBtn.innerHTML = '<i class="fas fa-volume-low"></i>';
    } else {
        volumeBtn.innerHTML = '<i class="fas fa-volume-high"></i>';
    }
}

function toggleMute() {
    if (state.isMuted) {
        setVolume(state.volume || 0.7);
        state.isMuted = false;
    } else {
        state.volume = audioPlayer.volume;
        setVolume(0);
        state.isMuted = true;
    }
}

// ==========================================
// PROGRESS BAR
// ==========================================
function updateProgress() {
    if (!audioPlayer.duration) return;

    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${percentage}%`;
    currentTimeEl.textContent = formatTime(audioPlayer.currentTime);
    durationEl.textContent = formatTime(audioPlayer.duration);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function parseDuration(durationStr) {
    const [mins, secs] = durationStr.split(':').map(Number);
    return mins * 60 + secs;
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================
function handleSearch(query) {
    const searchTerm = query.toLowerCase().trim();

    if (!searchTerm) {
        renderFeaturedSongs();
        return;
    }

    const results = musicData.featuredSongs.filter(song =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm) ||
        song.album.toLowerCase().includes(searchTerm) ||
        song.genre.toLowerCase().includes(searchTerm)
    );

    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = '';

    if (results.length === 0) {
        grid.innerHTML = '<p style="color: var(--color-text-muted); grid-column: 1/-1;">No results found</p>';
        return;
    }

    results.forEach((song, index) => {
        const card = createSongCard(song, musicData.featuredSongs.indexOf(song));
        grid.appendChild(card);
    });
}

function filterByGenre(genre) {
    const results = musicData.featuredSongs.filter(song => song.genre === genre);
    state.queue = results;

    const grid = document.getElementById('featuredGrid');
    grid.innerHTML = '';

    results.forEach((song, index) => {
        const card = createSongCard(song, index);
        grid.appendChild(card);
    });

    // Scroll to featured section
    document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
}

// ==========================================
// PLAYLIST MANAGEMENT
// ==========================================
function createPlaylist() {
    const name = prompt('Enter playlist name:');
    if (!name) return;

    const playlist = {
        id: Date.now(),
        name,
        songs: [],
        coverArt: 'https://via.placeholder.com/300x300/00f2fe/ffffff?text=' + encodeURIComponent(name)
    };

    state.playlists.push(playlist);
    savePlaylists();
    renderPlaylists();
}

// ==========================================
// LOCAL STORAGE
// ==========================================
function saveFavorites() {
    localStorage.setItem('vibefy_favorites', JSON.stringify(state.favorites));
}

function loadFavorites() {
    const saved = localStorage.getItem('vibefy_favorites');
    if (saved) {
        state.favorites = JSON.parse(saved);
    }
}

function savePlaylists() {
    localStorage.setItem('vibefy_playlists', JSON.stringify(state.playlists));
}

function loadPlaylists() {
    const saved = localStorage.getItem('vibefy_playlists');
    if (saved) {
        state.playlists = JSON.parse(saved);
    }
}

// ==========================================
// EVENT LISTENERS
// ==========================================
function setupEventListeners() {
    // Player controls
    playPauseBtn.addEventListener('click', togglePlayPause);
    nextBtn.addEventListener('click', playNext);
    prevBtn.addEventListener('click', playPrevious);
    shuffleBtn.addEventListener('click', toggleShuffle);
    repeatBtn.addEventListener('click', toggleRepeat);
    favoriteBtn.addEventListener('click', toggleFavorite);

    // Volume controls
    volumeBtn.addEventListener('click', toggleMute);
    volumeSlider.addEventListener('click', (e) => {
        const rect = volumeSlider.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        setVolume(percentage);
        state.isMuted = false;
    });

    // Progress bar
    progressBar.addEventListener('click', (e) => {
        if (!audioPlayer.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = x / rect.width;
        audioPlayer.currentTime = audioPlayer.duration * percentage;
    });

    // Search
    let searchTimeout;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(e.target.value);
        }, 300);
    });

    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            const href = link.getAttribute('href');
            if (href && href !== '#') {
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Create playlist button
    const createPlaylistBtn = document.getElementById('createPlaylistBtn');
    if (createPlaylistBtn) {
        createPlaylistBtn.addEventListener('click', createPlaylist);
    }

    // Queue button
    const queueBtn = document.getElementById('queueBtn');
    if (queueBtn) {
        queueBtn.addEventListener('click', () => {
            const queueSection = document.getElementById('queue');
            queueSection.style.display = queueSection.style.display === 'none' ? 'block' : 'none';
        });
    }
}

// ==========================================
// AUDIO PLAYER EVENTS
// ==========================================
audioPlayer.addEventListener('timeupdate', updateProgress);

audioPlayer.addEventListener('loadedmetadata', () => {
    updateProgress();
});

audioPlayer.addEventListener('ended', () => {
    if (state.repeat === 'one') {
        playSong(state.currentSongIndex);
    } else if (state.repeat === 'all' || state.currentSongIndex < state.queue.length - 1) {
        playNext();
    } else {
        pause();
    }
});

audioPlayer.addEventListener('error', (e) => {
    console.error('Audio error:', e);
    console.log('Failed to load audio from:', audioPlayer.src);
});

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================
document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;

    switch (e.code) {
        case 'Space':
            e.preventDefault();
            togglePlayPause();
            break;
        case 'ArrowRight':
            e.preventDefault();
            playNext();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            playPrevious();
            break;
        case 'ArrowUp':
            e.preventDefault();
            setVolume(state.volume + 0.1);
            break;
        case 'ArrowDown':
            e.preventDefault();
            setVolume(state.volume - 0.1);
            break;
    }
});

console.log('🎵 Vibefy is ready! Use spacebar to play/pause, arrow keys to navigate.');
