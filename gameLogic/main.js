//Seleccione los elmentos del DOM

const ballElement = document.getElementById("ball");
const playerElement = document.getElementById("player");
const machineElement = document.getElementById("machine");
const playerScoreElement = document.getElementById("score-left");
const machineScoreElement = document.getElementById("score-rigth");
const bounceSound = document.getElementById("bounceSound");

//initialScore
let playerScore = 0;
let machineScore = 0;

class Paddle {
	constructor(domElement, isPlayer = false) {
		this.domElement = domElement;
		this.isPlayer = isPlayer;
		this.positionX = this.isPlayer ? 0 : 49;
		this.speed = 3;
		this.positionY = 0;
		this.height = 10;
		this.width = 1;

		if (this.isPlayer) {
			this.height = 11;
			this.width = 1;
		} else {
			this.height = 24; // máquina más grande
			this.width = 2;
		}

		this.update();
	}
	moveUp() {
		if (this.positionY > 1) {
			this.positionY -= this.speed;
		}

		this.update();
	}
	moveDown() {
		if (this.positionY < 59 - this.height) {
			this.positionY += this.speed;
		}

		this.update();
	}
	update() {
		this.domElement.style.top = this.positionY + "vh";
		this.domElement.style.left = this.positionX + "vw";
		this.domElement.style.width = this.width + "vw";
		this.domElement.style.height = this.height + "vh";
	}
}

class Ball {
	constructor() {
		this.speedX = 0.4;
		this.speedY = 0.3;
		this.ballPositionX = 10;
		this.ballPositionY = 50;
		this.sizeBall = 2;
	}
	move() {
		this.ballPositionX += this.speedX;
		this.ballPositionY += this.speedY;

		this.checkCollision();
		this.updateUI();
	}
	reset() {
		this.ballPositionX = 27;
		this.ballPositionY = 30;
		this.speedX = 0;
		this.speedY = 0;
		setTimeout(() => {
			this.speedX = Math.random() > 0.5 ? 0.3 : -0.3;
			this.speedY = (Math.random() - 0.5) * 0.5;
		}, 1000);
	}

	checkCollision() {
		// collision with top & bottom walls
		if (this.ballPositionY <= 0) {
			this.ballPositionY = 0;
			this.speedY *= -1;
			return;
		} else if (this.ballPositionY >= 60 - this.sizeBall) {
			this.ballPositionY = 60 - this.sizeBall;
			this.speedY *= -1;
			return;
		}

		// collision with the paddles
		if (
			player.positionX < this.ballPositionX + this.sizeBall &&
			player.positionX + player.width > this.ballPositionX &&
			player.positionY < this.ballPositionY + this.sizeBall &&
			player.positionY + player.height > this.ballPositionY
		) {
			this.ballPositionX = player.positionX + player.width;
			this.speedX *= -1;
			bounceSound.currentTime = 0;
			bounceSound.play();
			return;
		} else if (
			machine.positionX < this.ballPositionX + this.sizeBall &&
			machine.positionX + machine.width > this.ballPositionX &&
			machine.positionY < this.ballPositionY + this.sizeBall &&
			machine.positionY + machine.height > this.ballPositionY
		) {
			this.ballPositionX = machine.positionX - this.sizeBall;
			this.speedX *= -1;
			bounceSound.currentTime = 0;
			bounceSound.play();

			return;
		}

		// collision with left & right walls
		if (this.ballPositionX <= -1) {
			machineScore++;
			machineScoreElement.innerText = machineScore;
			this.reset();
			checkWinningScore();
			return;
		} else if (this.ballPositionX >= 55 - this.sizeBall) {
			playerScore++;
			playerScoreElement.innerText = playerScore;
			this.reset();
			checkWinningScore();
			return;
		}
	}
	updateUI() {
		ballElement.style.left = this.ballPositionX + "vw";
		ballElement.style.top = this.ballPositionY + "vh";
	}
}
const player = new Paddle(playerElement, true);
const machine = new Paddle(machineElement, false);
const ball = new Ball();

//Implemente moviemiento a la paleta "machine"

let direction = 1;

function moveMachine() {
	machine.positionY += direction;

	if (machine.positionY <= 0 || machine.positionY >= 60 - machine.height) {
		direction *= -1;
	}

	machine.update();
}
setInterval(moveMachine, 30);
function gameLoop() {
	ball.move();
	requestAnimationFrame(gameLoop);
}

gameLoop();

//Evento click para cuando presiones cualquier flecha se muevan las paletas
document.addEventListener("keydown", (e) => {
	if (e.code === "ArrowUp") {
		player.moveUp();
		e.preventDefault();
	} else if (e.code === "ArrowDown") {
		player.moveDown();
		e.preventDefault();
	} else {
		e.preventDefault();
	}
});

function checkWinningScore() {
	const winningScore = 10;

	if (playerScore >= winningScore || machineScore >= winningScore) {
		alert(playerScore >= winningScore ? "¡Ganaste!" : "La máquina ganó!");
		location.href = "../gameLogic/instruction.js";
		// Reinicia los puntajes
		playerScore = 0;
		machineScore = 0;
		playerScoreElement.innerText = playerScore;
		machineScoreElement.innerText = machineScore;
		// Reinicia la bola
		ball.reset();
	}
}
