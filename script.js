class Game {
  constructor(gridSelector) {
    this.grid = document.querySelector(gridSelector);
    this.mode = "easy";
    this.clickedColors = new Set();
    this.colors = [];
    this.gridSize = 3;
    this.moveCount = 0;
    this.totalMoves = 0;
    this.updateMoveCounter();
    this.initGame();
  }

  initGame() {
    this.grid.innerHTML = "";
    this.clickedColors.clear();
    this.setGridSize();
    this.generateTiles();
    this.totalMoves = this.gridSize * this.gridSize;
    this.moveCount = 0;
    this.updateMoveCounter();
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
    this.mode = mode;
    this.initGame();
  }

  generateTiles() {
    this.colors = this.generateRandomColors(this.gridSize * this.gridSize);
    this.tiles = [];

    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const tile = new Tile(this.colors[i], this);
      tile.appendTo(this.grid);
      this.tiles.push(tile);
    }
  }

  generateRandomColors(count) {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const hue = Math.floor(Math.random() * 360);
      const saturation = 60 + Math.floor(Math.random() * 40);
      const lightness = 40 + Math.floor(Math.random() * 40);
      const randomColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      colors.push(randomColor);
    }
    return colors;
  }

  handleTileClick(color) {
    if (this.clickedColors.has(color)) {
      this.endGame(false);
    } else {
      this.clickedColors.add(color);
      this.moveCount++;
      this.updateMoveCounter();

      if (this.clickedColors.size === this.totalMoves) {
        this.endGame(true);
      } else {
        this.shuffleColors();
      }
    }
  }

  updateMoveCounter() {
    const remainingMoves = this.totalMoves - this.clickedColors.size;
    const counter = document.querySelector("#move-counter");

    if (counter) {
      counter.textContent = `Remaining: ${remainingMoves}`;
    }
  }

  shuffleColors() {
    this.colors = this.shuffleArray(this.colors);
    this.tiles.forEach((tile, index) => {
      tile.element.style.backgroundColor = this.colors[index];
    });
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  endGame(isWin) {
    const message = isWin ? "You win!" : "Game over!";
    alert(message);
    this.resetGame();
  }

  resetGame() {
    this.clickedColors.clear();
    this.moveCount = 0;
    this.initGame();
  }
}

class Tile {
  constructor(color, game) {
    this.color = color;
    this.game = game;
    this.element = document.createElement("div");
    this.element.classList.add("tile");
    this.element.style.backgroundColor = color;

    this.element.addEventListener("click", () => this.handleClick());
  }

  handleClick() {
    this.game.handleTileClick(this.color);
  }

  appendTo(parent) {
    parent.appendChild(this.element);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new Game("#grid");

  const modeButtons = document.querySelectorAll(".mode-btn");
  modeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedMode = event.target.dataset.mode;
      game.setMode(selectedMode);
    });
  });

  document.querySelector("#reset-btn").addEventListener("click", () => {
    game.resetGame();
  });
});
