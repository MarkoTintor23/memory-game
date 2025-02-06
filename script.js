const modeButtons = document.querySelectorAll(".mode-btn");

class Game {
  constructor(gridSelector) {
    this.grid = document.querySelector(gridSelector);
    this.mode = "easy";
    this.clickedColors = new Set();
    this.colors = [];
    this.gridSize = 3;
    this.initGame();
  }

  initGame() {
    this.grid.innerHTML = "";
    this.clickedColors.clear();
    this.setGridSize();
    this.generateTiles();
  }

  setGridSize() {
    if (this.mode === "easy") {
      this.gridSize = 3;
    } else if (this.mode === "medium") {
      this.gridSize = 4;
    } else if (this.mode === "hard") {
      this.gridSize = 5;
    }
    this.grid.className = `grid ${this.mode}`;
  }
  setMode(mode) {
    this.mode = mode; // Postavljamo novi mod
    this.initGame(); // Ponovo generišemo igru sa novim modom
  }
  generateTiles() {
    this.colors = this.generateRandomColors(this.gridSize * this.gridSize);

    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.style.backgroundColor = this.colors[i];

      tile.addEventListener("click", () => this.handleTileClick(tile));

      this.grid.appendChild(tile);
    }
  }

  generateRandomColors(count) {
    const colors = new Set();
    while (colors.size < count) {
      const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
      colors.add(randomColor);
    }
    return [...colors];
  }
}
const game = new Game("#grid");
modeButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const selectedMode = event.target.dataset.mode;
    game.setMode(selectedMode);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  new Game("#grid");
});
