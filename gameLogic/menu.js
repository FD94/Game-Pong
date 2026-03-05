const music = document.getElementById("bgMusic");
const startBtn = document.getElementById("start-btn");

startBtn.addEventListener("click", () => {
	music.volume = 0.5;
	music.play();

	// guardamos que la música ya empezó
	sessionStorage.setItem("musicPlaying", "true");

	// Guardar que la música ya empezó
	sessionStorage.setItem("musicPlaying", "true");

	// Mantener el tiempo actual de la música actualizado
	setInterval(() => {
		sessionStorage.setItem("musicTime", music.currentTime);
	}, 500);
});
