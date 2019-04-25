var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
const scale = 20;
var speed = 150;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;
var fruit;
var gameOver = false;



//----------------------SNAKE--------------------------s
function Snake() {
    this.x = 0;
    this.y = 0;
    this.dx = scale * 1;
    this.dy = 0;
    this.total = 0;
    this.tail = [];

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "black";

        for(let i = 0; i < this.tail.length; i++) {
            c.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        c.fillRect(this.x, this.y, scale, scale);
        c.stroke();
    }

    this.update = function() {
        for(let i=0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[this.total - 1] = { x: this.x, y: this.y};

        this.x += this.dx;
        this.y += this.dy;
        
        if(this.x > canvas.width) {
            this.x = 0;
        }
        if(this.y > canvas.height) {
            this.y = 0;
        }
        if(this.x < 0) {
            this.x = canvas.width;
        }
        if(this.y < 0) {
            this.y = canvas.height;
        }
    }

    this.changeDirection = function(direction) {
        switch(direction) {
            case 'Up':
                if(this.dy <= 0) {
                    this.dx = 0;
                    this.dy = -scale * 1;
                }
                break;
            case 'Down':
                if(this.dy >= 0) {
                    this.dx = 0;
                    this.dy = scale * 1;
                }
                break;
            case 'Left':
                if(this.dx <= 0) {
                    this.dx = -scale * 1;
                    this.dy = 0;
                }
                break;
            case 'Right':
                if(this.dx >= 0) {
                    this.dx = scale * 1;
                    this.dy = 0;
                }
                break;
        }
    }

    this.eat = function(fruit) {
        if(this.x === fruit.x && this.y === fruit.y) {
            return true;
        } else {
            return false;
        }
    }
}




//----------------------FRUIT--------------------------
function Fruit() {
    this.x;
    this.y;

    this.pickLocation = function() {
        this.x = (Math.floor(Math.random() * rows - 1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns - 1) + 1) * scale;
    }

    this.draw = function() {
        c.beginPath();
        c.fillStyle = "red";
        c.fillRect(this.x, this.y, scale, scale);
        c.stroke();
    }
}



var updateInterval;

//---------------------GAME----------------------------
function setup() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.pickLocation();

    window.setInterval(() => {
        c.clearRect(0, 0, canvas.width, canvas.height);
        snake.draw();
        snake.update();
        fruit.draw();

        for(let i = 0; i < snake.tail.length; i++) {
            if(snake.x === snake.tail[i].x && snake.y === snake.tail[i].y) {
                snake.dx = 0;
                snake.dy = 0;
                resetGame();
            }
        }
        
        if(snake.eat(fruit)) {
            fruit.pickLocation();
            snake.total += 1;
        }
    }, speed);
    
}




window.addEventListener('keydown', ((evt) => {
    var direction = evt.key.replace('Arrow', '');
    if(gameOver === false) {
        snake.changeDirection(direction);
    }
}));



//----------------GAME OVER / RESET-----------------
// reset game function under construction!!

function resetGame() {
    gameOver = true;
    var newGame = confirm("GAME OVER! You scored: " + snake.total + ". New game?");
}


setup();