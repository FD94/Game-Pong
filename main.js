//Seleccione los elmentos del DOM

const ballElement = document.getElementById("ball");
const playerElement = document.getElementById("player");
const machineElement = document.getElementById("machine");

var height = 10;
var width = 1;
class Paddle {
	constructor(domElement, isPlayer = false) {
		this.domElement = domElement;
		this.isPlayer = isPlayer;
		this.positionX = this.isPlayer ? 0 : 50;
		this.speed = 3;
		this.positionY = 0;

		this.update();
	}
	moveUp() {
		if (this.positionY > 1) {
			player.positionY--;
		}

		this.update();
	}
	moveDown() {
		if (this.positionY < 60 - height) {
			player.positionY++;
		}
		this.update();
	}
	update() {
		this.domElement.style.top = this.positionY + "vh";
		this.domElement.style.width = this.width + "vw";
		this.domElement.style.height = this.height + "vh";
	}
}

class Ball {
	constructor() {
		this.speedX = 0.1;
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

		document.getElementById("playerposition").innerText =
			"Player position Y:" + player.positionY;

		document.getElementById("ballposition").innerText =
			"Ball positionX: " +
			Math.round(this.ballPositionX, 2) +
			" | Y: " +
			Math.round(this.ballPositionY, 2);

		// collision with the paddles
		if (
			player.positionX < this.ballPositionX + width &&
			//player.positionX > this.ballPositionX &&
			player.positionY < this.ballPositionY + height &&
			player.positionY + height > this.ballPositionY
		) {
			console.log("PASOOOO");

			return;
		} else if (
			machine.positionX < this.ballPositionX + this.width &&
			machine.positionX + this.width > this.ballPositionX &&
			machine.positionY < this.ballPositionY + this.height &&
			machine.positionY + this.height > this.ballPositionY
		) {
			// collision with machine paddle
			// ...

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
