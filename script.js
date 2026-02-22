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