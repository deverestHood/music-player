const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.querySelector('audio');

// Music
const songs = [
    {
        name: 'Pixie',
        displayName: 'Pixie',
        artist: 'slip.stream',
        albumArt: 'william-christen-o4xVOHa3FXw-unsplash.jpg'
    },
    {
        name:'Cyber Fields',
        displayName: 'Cyber Fields',
        artist: 'Spiros Maus',
        albumArt: 'shambhavi-singh-GsJCCRWEsCE-unsplash.jpg'
    },
    {
        name: 'Above And Below',
        displayName: 'Above And Below',
        artist: 'slip.stream',
        albumArt: 'shambhavi-singh-uTUAflZAbIA-unsplash.jpg'
    }
]

// Check if playing
let isPlaying = false;

// Play
const playSong = () => {
    isPlaying = true;
    // to show pause button after play click
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

// Pause
const pauseSong = () => {
    isPlaying = false;
    // play button shown after pause click
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
const loadSong = song => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.albumArt}`;
}

// Current song
let songIndex = 0;

// Previous song
const prevSong = () => {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next song
const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// On load - Select first song
loadSong(songs[songIndex]);

// Update progress bar & time by passing in event (e)
const updateProgressBar = (e) => {
    if (isPlaying) {
        // destructuring
        const { duration, currentTime } = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display for song duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // delay switching duration element to avoid NaN showing
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // calculate display for currentTime
        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        if (currentTimeSeconds < 10) {
            currentTimeSeconds = `0${currentTimeSeconds}`;
        }
        currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;
    }
}

//set progress bar
const setProgressBar = (e) => {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    // width in seconds
    music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);



