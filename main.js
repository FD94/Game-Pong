const ballElement = document.getElementById("ball");
const playerElement = document.getElementById("player");
const machineElement = document.getElementById("machine");

class Paddle {
	constructor(domElement, isPlayer = false) {
		this.domElement = domElement;
		this.isPlayer = isPlayer;
		this.positionX = this.isPlayer ? 0.1 : 48.5;
		this.heigth = 10;
		this.width = 1;
		this.speed = 3;
		this.positionY = 1 - this.width / 2;

		this.update();
	}
	moveUp() {
		if (this.positionY > 0) {
			this.positionY--;
		}

		this.update();
	}
	moveDown() {
		if (this.positionY < 100 - this.heigth) {
			this.positionY++;
		}
		this.update();
	}
	update() {
		this.domElement.style.top = this.positionY + "vh";
		this.domElement.style.width = this.width + "vw";
		this.domElement.style.height = this.heigth + "vh";
	}
}

let direction = 1;

function moveMachine() {
	machine.positionY += direction;

	if (machine.positionY <= 0 || machine.positionY >= 50) {
		direction *= -1;
	}

	machine.update();
}

const player = new Paddle(playerElement, true);
const machine = new Paddle(machineElement, false);
setInterval(moveMachine, 30);

document.addEventListener("keydown", (e) => {
	if (e.code === "ArrowUp") {
		player.moveUp();
	} else if (e.code === "ArrowDown") {
		player.moveDown();
	}
});
