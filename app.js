// Enemies to be avoided
// Create a class for the enemy
class Enemy {
	constructor() {
		// randomness between 0 and 3 which coresponds to each row
		let rdomRow = Math.round(Math.random() * 3);

		let rdomSprite = Math.round(Math.random() * 3);
		const pocessedSprites = [
			'images/enemy-bug.png',
			'images/enemy-bug.png',
			'images/enemy-bug.png',
			'images/enemy-bug.png',

		];

		this.rows = [60, 145, 230, 315];

		// initial position, outside canvas between -100 and -200
		this.x = -(Math.round(Math.random() * 100) + 100);
		this.y = this.rows[rdomRow];

		// random speed setter (80 - 300)
		this.speed = Math.round(Math.random() * 220) + 80;
		this.sprite = pocessedSprites[rdomSprite];
	}

	// Continous flow of bug when out of canvas
	setInitialX() {
		return -(Math.round(Math.random() * 100) + 100);
	}

	setRow() {
		return Math.round(Math.random() * 3);
	}

	// pauses the bugs in their current position
	// Modal loss displayed
	standStill() {
		this.speed = 0;
	}
	//Update the enemy position
	update(dt) {
		this.x += dt * this.speed;

		if (this.x > 500) {
			// Enemy reset behind the canvas
			this.x = this.setInitialX();

			// randomizing enemy position on each update
			this.y = this.rows[this.setRow()];
		}

		// Conditional Checks
		// Is player and the enemy are in the same row?
		// Are they colliding
		if (this.y == player.y && (this.x > player.x - 70 && this.x < player.x + 60)) {
			player.collision = true;
		};
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}
//Write your own player class as instructed by Udacity
// -----Here is my own player class -----

class Player {
	constructor() {
		this.x = 200;
		this.y = 400;
		this.moves = 0;
		this.collision = false;
		this.crossed = false;
		this.notmoving = false;
		this.sprite = 'images/char-boy.png';
	}
	//create the methods:
	// player's initial position
	reset() {
		this.x = 200;
		this.y = 400;
		this.moves = 0;
	}

	handleInput(key) {
		if (!this.notmoving) {
			if (key === 'left' || key === 'a') {
				this.moves++;
				if (this.x > 0)
					this.x -= 100; // Left movement: one column to the left
			} else if (key === 'up' || key === 'w') {
				this.moves++;
				if (this.y >= 60)
					this.y -= 85; // one row up at each step
				if (this.y == -25) {
					this.notmoving = true;
					// Reset back to the initial position after crosing safely
					setTimeout(() => {
						this.crossed = true;
					}, 400);
				}
			} else if (key === 'right' || key === 'd') {
				this.moves++;
				if (this.x < 400)
					this.x += 100; // one column to the right
			} else if (key === 'down' || key === 's') {
				this.moves++;
				if (this.y < 400)
					this.y += 85; // one row down at each step.
			}
		}
	}

	update() {
		if (this.crossed) {
			this.crossed = false;
			this.notmoving = false;

			if (this.moves === 5) {
				score.count += 100;
			} else if (this.moves < 10) {
				score.count += this.moves * 10;
			}

			score.count += 100;
			this.reset();

			if (score.count >= 1500 && score.count <= 2000) {
				progressMsg();
			} else if (score.count >= 4500) {
				outputScreen();
			}
		}

		if (this.collision) {
			this.collision = false;

			lives.reduce();
			this.reset();

			if (lives.count === 0) {
				this.notmoving = true;
				pauseGame();
				toggleModal();
			}
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class availableLives {
	constructor() {
		this.x = 10;
		this.y = 10;

		this.count = 3;
		this.sprite = 'images/Star.png';

		const spriteWidth = 40;
		const spriteHeight = 60;
	}

	reduce() {
		this.count--;
	}

	reset() {
		this.count = 3;
	}

	static get spriteWidth() {
		return 40;
	}

	static get spriteHeight() {
		return 60;
	}

	render() {
		let xPos = this.x;

		// renders heart sprites based on the current lives count
		for (let index = 0; index < this.count; index++) {
			ctx.drawImage(Resources.get(this.sprite), xPos, this.y, availableLives.spriteWidth, availableLives.spriteHeight);
			xPos += this.x + 10;
		}
	}
}

class Score {
	constructor() {
		this.x = 20;
		this.y = 575;

		this.count = 0;
	}

	reset() {
		this.count = 0;
	}

	render() {
		ctx.font = "20px Impact";
		ctx.fillText("SCORE:", this.x, this.y);
		ctx.font = "25px Impact";
		ctx.fillText(this.count, this.x + 105, this.y);
	}
}

function pauseGame() {
	allEnemies.forEach((enemy) => {
		enemy.standStill();
	})
}

function gameRestart() {
	player.reset();
	lives.reset();
	score.reset();
}

let allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player();
let lives = new availableLives();
let score = new Score();

function progressMsg() {
	const msg = document.getElementsByClassName('header-msg')[0];

	msg.innerHTML = 'Milestone! Outstanding 1500 points. Move on!';
}

function outputScreen() {
	const unfortunateMsg = document.getElementsByClassName('loosing')[0];
	const winning = document.getElementsByClassName('congrats')[0];


	unfortunateMsg.style.display = "none";
	winning.style.display = "block";

	pauseGame();
	toggleModal();

}

function toggleModal() {
	const modal = document.getElementsByClassName('modal')[0];

	if (modal.style.display == "none" || !modal.style.display) {
		modal.style.display = "block";
	} else {
		modal.style.display = "none";
	}
}

(() => {
	const restartBton = document.getElementsByClassName('restart')[0];
	const tryAgainBton = document.getElementsByClassName('start-over')[0];

	restartBton.addEventListener('click', () => {
		gameRestart();
	});

	tryAgainBton.addEventListener('click', () => {
		toggleModal();
		location.reload();
	});
})();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this
// and yet, I did...
document.addEventListener('keyup', function (e) {
	var allowedKeys = {
		37: 'left',
		38: 'up',
		39: 'right',
		40: 'down',
		65: 'a',
		87: 'w',
		68: 'd',
		83: 's'
	};

	player.handleInput(allowedKeys[e.keyCode]);
});