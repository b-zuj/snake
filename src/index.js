class WorldMap {
  constructor (width, height, renderingContext) {
    this.width = width;
    this.height = height;
    this.renderingContext = renderingContext;
    this.worldCellWidth = this.renderingContext.canvas.scrollWidth/this.width;
    this.worldCellHeight = this.renderingContext.canvas.scrollHeight/this.height;
    const generate = () => [...Array(width)].map(x=>Array(height).fill(0))
    this.cells = generate();
  }
  draw() {
    for (let i=0; i < this.width; i++) {
      for (let j=0; j < this.height; j++) {
        this.drawCell(i, j, this.cells[i][j] )
      }
    }
  }
  drawCell(x, y, type) {
    const worldX = x * this.worldCellWidth;
    const worldY = y * this.worldCellHeight;
    if (type === 'x' ) {
      this.renderingContext.fillStyle = 'red';
    } else if (type > 0) {
      this.renderingContext.fillStyle = 'blue';
    } else {
      this.renderingContext.fillStyle = 'gray';
    }
    this.renderingContext.fillRect(worldX, worldY, this.worldCellWidth, this.worldCellHeight);
  }
  setCell(x, y, value) {
    this.cells[x][y] = value;
  }
}

class Game {
  constructor (width, height, renderingContext, rate) {
    this.width = width;
    this.height = height;
    this.worldMap = new WorldMap(this.width, this.height, renderingContext);
    this.rate = 1000/rate;
    this.lastTime = (new Date()).getTime();
    this.gameLoop = this.gameLoop.bind(this);
    this.snakeLength = 3;
    this.snakeDirection = 'right'; // x++; 'left' - x--, 'up' - y++, 'down' - y--
  }
  gameLoop() {
    window.requestAnimationFrame(this.gameLoop);
    
    const currentTime = (new Date()).getTime();
    let delta = (currentTime-this.lastTime);

    if(delta > this.rate) {
      console.log(this.snakeLength)
      this.placeApple();
      this.placeSnake();
      this.worldMap.draw();
      this.lastTime = currentTime - (delta % this.rate);
    }
  }
  placeApple() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    this.worldMap.setCell(x, y, 'x')
  }
  placeSnake() {
    const headX = Math.round(this.width/2)-1;
    const headY = Math.round(this.height/2)-1;
    for (let i=0; i < this.snakeLength; i++) {
      let x = headX  - i;
      let y = headY;
      let value = this.snakeLength - i
      this.worldMap.setCell(x, y, value)
    }
  }
}


const ctx = document.getElementById("myCanvas").getContext("2d");

let game = new Game(15, 7, ctx, 3)

game.gameLoop()