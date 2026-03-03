//Seleccione los elmentos del DOM

const ballElement = document.getElementById("ball");
const playerElement = document.getElementById("player");
const machineElement = document.getElementById("machine");

class Paddle {
	constructor(domElement, isPlayer = false) {
		this.domElement = domElement;
		this.isPlayer = isPlayer;
		this.positionX = this.isPlayer ? 0 : 50;
		this.heigth = 10;
		this.width = 1;
		this.speed = 3;
		this.positionY = 0;

		this.update();
	}
	moveUp() {
		if (this.positionY > 1) {
			this.positionY--;
		}

		this.update();
	}
	moveDown() {
		if (this.positionY < 59 - this.heigth) {
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

const player = new Paddle(playerElement, true);
const machine = new Paddle(machineElement, false);

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

//Evento click para cuando presiones cualquier flecha se muevan las paletas

document.addEventListener("keydown", (e) => {
	if (e.code === "ArrowUp") {
		player.moveUp();
	} else if (e.code === "ArrowDown") {
		player.moveDown();
	}
});
