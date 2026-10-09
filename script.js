// ENVIADO POR ARQUIVO POIS O GITHUB NÃO PERMITE MÚSICAS COM DIREITOS AUTORAIS

const playlist = [
  {
    title: "Canto de Olho",
    artist: "Donner & Tie",
    cover: "https://artlist-albums.imgix.net/images/12351_961087_961087_Donner_-_Tie_Feat._Joa%CC%83o_Biano_-_Sambas_do_Avesso_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./musicas/donner-tie-canto-de-olho.mp3"
  },
  {
    title: "Continent",
    artist: "ANBR",
    cover: "https://artlist-albums.imgix.net/images/1084_69478_69478_ANBR_-_The_Journey_-_A.jpg?auto=format&fit=max&w=64&q=75",
    src: "./musicas/continente-anbr.mp3"
  },
  {
    title: "Lose My Mind",
    artist: "Flint",
    cover: "https://artlist-albums.imgix.net/images/7ed3b32c-35ee-4a12-8b46-150d50518179_IMAGE_ecc87b09-e2fb-4a81-ba7a-1b503c300a90_1780990921738.jpg?auto=format&fit=max&w=64&q=75",
    src: "./musicas/flint-lose-my-mind.mp3"
  }
];

const audio = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("btn-play-pause");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const albumCover = document.getElementById("album-cover");
const statusBadge = document.getElementById("status-badge");

const progressBar = document.getElementById("progress-bar");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const volumeBar = document.getElementById("volume-bar");
const volumeIcon = document.getElementById("volume-icon");

let currentSongIndex = 0;
let isPlaying = false;

function loadSong(song) {
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  albumCover.src = song.cover;
  audio.src = song.src;
}

loadSong(playlist[currentSongIndex]);

function playSong() {
  isPlaying = true;
  audio.play();
  playIcon.className = "ph-fill ph-pause";
  statusBadge.textContent = "Tocando";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();
  playIcon.className = "ph-fill ph-play";
  statusBadge.textContent = "Pausado";
}

playPauseBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  if (isPlaying) playSong();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  loadSong(playlist[currentSongIndex]);
  if (isPlaying) playSong();
});

audio.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.srcElement;
  if (isNaN(duration)) return;

  const progressPercent = (currentTime / duration) * 100;
  progressBar.value = progressPercent;

  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
});

progressBar.addEventListener("input", () => {
  const seekTime = (progressBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

volumeBar.addEventListener("input", (e) => {
  const value = e.target.value / 100;
  audio.volume = value;

  if (value === 0) {
    volumeIcon.className = "ph-fill ph-speaker-x";
  } else if (value < 0.5) {
    volumeIcon.className = "ph-fill ph-speaker-low";
  } else {
    volumeIcon.className = "ph-fill ph-speaker-high";
  }
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

function formatTime(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}