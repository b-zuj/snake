import WorldMap from './worldMap'

const directions = {
  RIGHT: "right",
  LEFT: "left",
  UP: "up",
  DOWN: "down",
}

 export default class Game {
  constructor (width, height, renderingContext) {   
    this.width = width;
    this.height = height;
    this.renderingContext = renderingContext
    this.lastTime = (new Date()).getTime();
    this.setStartingState = this.gameInit();
    this.gameLoop = this.gameLoop.bind(this);
    this.placeApple = this.placeApple.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  gameInit() {
    this.worldMap = new WorldMap(this.width, this.height, this.renderingContext);
    this.rate = 1000/3;
    this.snakeLength = 3;
    this.snakeHeadCoordinates = [];
    this.snakeDirection = directions.RIGHT;
    this.placeSnake();
    this.placeApple();
    this.worldMap.draw();
  }
  gameLoop() {
    window.requestAnimationFrame(this.gameLoop);
    
    const currentTime = (new Date()).getTime();
    let delta = (currentTime-this.lastTime);
    
    if(delta > this.rate) {
      switch (this.snakeDirection){
        case directions.RIGHT:
          this.snakeHeadCoordinates[0]++;
          this.snakeHeadCoordinates[0] == this.width ? 
            this.snakeHeadCoordinates[0] = 0 :
            null;
          break;
        case directions.LEFT:
          this.snakeHeadCoordinates[0]--;
          this.snakeHeadCoordinates[0] < 0 ? 
            this.snakeHeadCoordinates[0] = this.width-1 :
            null;
          break;
        case directions.UP:
          this.snakeHeadCoordinates[1]--;
          this.snakeHeadCoordinates[1] < 0 ? 
            this.snakeHeadCoordinates[1] = this.height-1 :
            null;
          break;
        case directions.DOWN:
          this.snakeHeadCoordinates[1]++;
          this.snakeHeadCoordinates[1] == this.height ? 
            this.snakeHeadCoordinates[1] = 0 :
            null;
          break;
        default:
          return;
      }

      const nextCellValue = this.worldMap.cells[this.snakeHeadCoordinates[0]][this.snakeHeadCoordinates[1]]
      if (nextCellValue > 0) {
        this.gameInit()
      } else if (nextCellValue == 'x') {
        this.snakeLength++;
        this.placeApple();
        this.rate = this.rate * 0.95
      }

      this.worldMap.setCell(this.snakeHeadCoordinates[0], this.snakeHeadCoordinates[1], this.snakeLength);
      this.worldMap.draw();
      
      this.lastTime = currentTime - (delta % this.rate);
    }
  }
  placeApple() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    const worldCellValue = this.worldMap.cells[x][y]
    if (worldCellValue == 0) {
      this.worldMap.setCell(x, y, 'x');
      return;
    }
    this.placeApple();
  }
  placeSnake() {
    const headX = Math.round(this.width/2)-1;
    const headY = Math.round(this.height/2)-1;
    this.snakeHeadCoordinates = [headX, headY];

    for (let i=0; i < this.snakeLength; i++) {
      let x = headX  - i;
      let y = headY;
      let value = this.snakeLength - i;
      this.worldMap.setCell(x, y, value);
    }
  }
  handleKeypress(event) {
    event.preventDefault();
    switch (event.key) {
      case 'ArrowUp':
          if (this.snakeDirection == directions.DOWN) {
            break
          }
          this.snakeDirection = directions.UP;
          break;
      case 'ArrowDown':
          if (this.snakeDirection == directions.UP) {
            break;
          }
          this.snakeDirection = directions.DOWN;
          break;
      case 'ArrowLeft':
          if (this.snakeDirection == directions.RIGHT) {
            break;
          }
          this.snakeDirection = directions.LEFT;
          break;
      case 'ArrowRight':
          if (this.snakeDirection == directions.LEFT) {
            break;
          }
          this.snakeDirection = directions.RIGHT;
          break;
      default:
          return;
    }
  }
}
