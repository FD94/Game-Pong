//Seleccione los elmentos del DOM

const ballElement = document.getElementById("ball");
const playerElement = document.getElementById("player");
const machineElement = document.getElementById("machine");
const scoreLeftElement = document.getElementById("score-left");
const scoreRigthElement = document.getElementById("score-rigth");

class Paddle {
	constructor(domElement, isPlayer = false) {
		this.domElement = domElement;
		this.isPlayer = isPlayer;
		this.positionX = this.isPlayer ? 0 : 49;
		this.speed = 3;
		this.positionY = 0;
		this.height = 10;
		this.width = 1;

		this.update();
	}
	moveUp() {
		if (this.positionY > 1) {
			this.positionY--;
		}

		this.update();
	}
	moveDown() {
		if (this.positionY < 60 - this.height) {
			this.positionY++;
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
		this.speedX = 0.3;
		this.speedY = 0.2;
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
			console.log("COLISION PLAYER");
			this.ballPositionX = player.positionX + player.width;
			this.speedX *= -1;
			return;
		} else if (
			machine.positionX < this.ballPositionX + this.sizeBall &&
			machine.positionX + machine.width > this.ballPositionX &&
			machine.positionY < this.ballPositionY + this.sizeBall &&
			machine.positionY + machine.height > this.ballPositionY
		) {
			console.log("COLISION MACHINE");
			this.ballPositionX = machine.positionX - this.sizeBall;
			this.speedX *= -1;

			return;
		}

		// collision with left & right walls
		if (this.ballPositionX <= -1) {
			this.ballPositionX = 0;
			this.speedX *= -1;
		} else if (this.ballPositionX >= 55 - this.sizeBall) {
			this.ballPositionX = 55 - this.sizeBall;
			this.speedX *= -1;
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

	if (machine.positionY <= 0 || machine.positionY >= 50) {
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
