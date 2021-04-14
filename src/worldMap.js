export default class WorldMap {
  constructor (width, height, renderingContext) {
    this.width = width;
    this.height = height;
    this.renderingContext = renderingContext;
    this.worldCellWidth = this.renderingContext.canvas.scrollWidth/this.width;
    this.worldCellHeight = this.renderingContext.canvas.scrollHeight/this.height;
    this.cells = this.generateCells();
  }
  generateCells() {
    return [...Array(this.width)].map(x=>Array(this.height).fill(0))
  }
  draw() {
    this.renderingContext.clearRect(0, 0, this.renderingContext.canvas.width, this.renderingContext.canvas.height);
    for (let i=0; i < this.width; i++) {
      for (let j=0; j < this.height; j++) {
        this.drawCell(i, j, this.cells[i][j] )
        if (this.cells[i][j] > 0){
          this.cells[i][j]--
        }
      }
    }
  }
  drawCell(x, y, type) {
    const worldX = x * this.worldCellWidth;
    const worldY = y * this.worldCellHeight;
    if (type === 'x' ) {
      this.renderingContext.fillStyle = 'red';
      this.renderingContext.fillRect(worldX, worldY, this.worldCellWidth, this.worldCellHeight);
    } else if (type > 0) {
      this.renderingContext.fillStyle = 'blue';
      this.renderingContext.fillRect(worldX, worldY, this.worldCellWidth, this.worldCellHeight);
    } 
  }
  setCell(x, y, value) {
    this.cells[x][y] = value;
  }
}