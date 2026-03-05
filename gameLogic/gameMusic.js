const music = document.getElementById("bgMusic");

if (sessionStorage.getItem("musicPlaying") === "true") {
	music.volume = 0.5;
	music.play();

	setInterval(() => {
		sessionStorage.setItem("musicTime", music.currentTime);
	}, 500);
}
