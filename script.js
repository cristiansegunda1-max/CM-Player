let audio = document.getElementById("audio");
const cover = document.querySelector(".cover");
const background = document.querySelector(".background");
const progress = document.querySelector(".progress");

function togglePlay() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

/* Fondo dinámico */
cover.onload = () => {
  background.style.backgroundImage = `url(${cover.src})`;
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.filter = "blur(80px) brightness(0.4)";
};

/* Barra de progreso */
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";
});

const playerScreen = document.getElementById("playerScreen");
const libraryScreen = document.getElementById("libraryScreen");
const songList = document.getElementById("songList");

/* Navegación */
function openLibrary() {
  playerScreen.classList.remove("active");
  libraryScreen.classList.add("active");
}

function closeLibrary() {
  libraryScreen.classList.remove("active");
  playerScreen.classList.add("active");
}

const songs = [
  { 
    title: "Canción 1", 
    file: "assets/music.mp3",
    cover: "assets/cover1.jpg"
  },
  { 
    title: "Canción 2", 
    file: "assets/music2.mp3",
    cover: "assets/cover2.jpg"
  }
];

songs.forEach(song => {
  const li = document.createElement("li");
  li.textContent = song.title;
  li.onclick = () => {
  changeSong(song);
};
  songList.appendChild(li);
});

function changeSong(song) {
  cover.classList.add("animate");

  setTimeout(() => {
    audio.src = song.file;
    document.querySelector(".title").textContent = song.title;
    cover.src = song.cover;
    audio.play();

    cover.classList.remove("animate");
    updateBackground(song.cover);
    closeLibrary();
  }, 300);
}

function updateBackground(image) {
  background.style.backgroundImage = `url(${image})`;
  background.style.backgroundSize = "cover";
  background.style.backgroundPosition = "center";
  background.style.filter = "blur(80px) brightness(0.4)";
}

let startX = 0;
let currentIndex = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;

  if (endX - startX > 50) {
    previousSong();
  }

  if (startX - endX > 50) {
    nextSong();
  }
});

function nextSong() {
  currentIndex = (currentIndex + 1) % songs.length;
  changeSong(songs[currentIndex]);
}

function previousSong() {
  currentIndex =
    (currentIndex - 1 + songs.length) % songs.length;
  changeSong(songs[currentIndex]);
}

async function scanDeviceMusic() {
  console.log("Escaneo pendiente para versión Android nativa");
}