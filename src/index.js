const ctx = document.getElementById("myCanvas").getContext("2d");

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
        if (this.cells[i][j] > 0){
          this.cells[i][j]--
        }
      }
    }
    console.log(this.cells)
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

// function getIndexOfK(arr, k) {
//   for (var i = 0; i < arr.length; i++) {
//     var index = arr[i].indexOf(k);
//     if (index > -1) {
//       return [i, index];
//     }
//   }
// }

class Game {
  constructor (width, height, renderingContext, rate) {
    this.width = width;
    this.height = height;
    this.worldMap = new WorldMap(this.width, this.height, renderingContext);
    this.rate = 1000/rate;
    this.lastTime = (new Date()).getTime();
    this.gameLoop = this.gameLoop.bind(this);
    this.start = true;
    this.snakeHeadCoordinates = [];
    this.snakeLength = 3;
    this.snakeDirection = 'right';
  }
  gameLoop() {
    window.requestAnimationFrame(this.gameLoop);
    
    const currentTime = (new Date()).getTime();
    let delta = (currentTime-this.lastTime);
    if (this.start) {
      this.placeSnake();
      this.start = false;
    };
    
    if(delta > this.rate) {
      
      this.placeApple();
      this.worldMap.draw();

      console.log(this.snakeHeadCoordinates);

      switch (this.snakeDirection){
        case 'right':
          this.snakeHeadCoordinates[0]++;
          this.worldMap.setCell(this.snakeHeadCoordinates[0], this.snakeHeadCoordinates[1], this.snakeLength);
          break;
        case 'left':
          this.snakeHeadCoordinates[0]--;
          this.worldMap.setCell(this.snakeHeadCoordinates[0], this.snakeHeadCoordinates[1], this.snakeLength);
          break;
        case 'up':
          this.snakeHeadCoordinates[1]--;
          this.worldMap.setCell(this.snakeHeadCoordinates[0], this.snakeHeadCoordinates[1], this.snakeLength);
          break;
        case 'down':
          this.snakeHeadCoordinates[1]++;
          this.worldMap.setCell(this.snakeHeadCoordinates[0], this.snakeHeadCoordinates[1], this.snakeLength);
          break;
      }

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
    this.snakeHeadCoordinates = [headX, headY];
    for (let i=0; i < this.snakeLength; i++) {
      let x = headX  - i;
      let y = headY;
      let value = this.snakeLength - i
      this.worldMap.setCell(x, y, value)
    }
  }
}

let game = new Game(15, 7, ctx, 1);
game.gameLoop()
