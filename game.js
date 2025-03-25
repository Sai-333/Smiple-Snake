class Snake {
    constructor() {
        this.reset();
    }

    reset() {
        this.position = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };
        this.growthLeft = 0;
    }

    update() {
        this.direction = this.nextDirection;
        const newHead = {
            x: this.position[0].x + this.direction.x,
            y: this.position[0].y + this.direction.y
        };
        this.position.unshift(newHead);
        if (this.growthLeft > 0) {
            this.growthLeft--;
        } else {
            this.position.pop();
        }
    }

    grow() {
        this.growthLeft += 2;
    }

    setDirection(direction) {
        const oppositeDirection = (
            (direction.x !== 0 && direction.x === -this.direction.x) ||
            (direction.y !== 0 && direction.y === -this.direction.y)
        );
        if (!oppositeDirection) {
            this.nextDirection = direction;
        }
    }

    checkCollision(width, height) {
        const head = this.position[0];
        if (head.x < 0 || head.x >= width || head.y < 0 || head.y >= height) {
            return true;
        }
        return this.position.slice(1).some(segment =>
            segment.x === head.x && segment.y === head.y
        );
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.gridSize = 20;
        this.width = this.canvas.width / this.gridSize;
        this.height = this.canvas.height / this.gridSize;
        this.snake = new Snake();
        this.food = this.generateFood();
        this.score = 0;
        this.gameOver = false;
        this.bindControls();
        this.lastRenderTime = 0;
        this.gameLoop = this.gameLoop.bind(this);
    }

    bindControls() {
        document.addEventListener('keydown', (e) => {
            const directions = {
                'ArrowUp': { x: 0, y: -1 },
                'ArrowDown': { x: 0, y: 1 },
                'ArrowLeft': { x: -1, y: 0 },
                'ArrowRight': { x: 1, y: 0 }
            };
            if (directions[e.key]) {
                e.preventDefault();
                this.snake.setDirection(directions[e.key]);
            }
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.restart();
        });
    }

    generateFood() {
        while (true) {
            const food = {
                x: Math.floor(Math.random() * this.width),
                y: Math.floor(Math.random() * this.height)
            };
            if (!this.snake.position.some(segment =>
                segment.x === food.x && segment.y === food.y
            )) {
                return food;
            }
        }
    }

    update() {
        if (this.gameOver) return;

        this.snake.update();

        if (this.snake.checkCollision(this.width, this.height)) {
            this.gameOver = true;
            document.getElementById('game-over').style.display = 'block';
            return;
        }

        if (this.snake.position[0].x === this.food.x &&
            this.snake.position[0].y === this.food.y) {
            this.score += 10;
            document.getElementById('score').textContent = `Score: ${this.score}`;
            this.snake.grow();
            this.food = this.generateFood();
        }
    }

    draw() {
        this.ctx.fillStyle = '#2c3e50';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = '#2ecc71';
        this.snake.position.forEach(segment => {
            this.ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 1,
                this.gridSize - 1
            );
        });

        // Draw food
        this.ctx.fillStyle = '#e74c3c';
        this.ctx.fillRect(
            this.food.x * this.gridSize,
            this.food.y * this.gridSize,
            this.gridSize - 1,
            this.gridSize - 1
        );
    }

    gameLoop(currentTime) {
        window.requestAnimationFrame(this.gameLoop);

        const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
        if (secondsSinceLastRender < 1 / 10) return;

        this.lastRenderTime = currentTime;
        this.update();
        this.draw();
    }

    start() {
        window.requestAnimationFrame(this.gameLoop);
    }

    restart() {
        this.snake.reset();
        this.food = this.generateFood();
        this.score = 0;
        document.getElementById('score').textContent = 'Score: 0';
        this.gameOver = false;
        document.getElementById('game-over').style.display = 'none';
    }
}

const game = new Game();
game.start();