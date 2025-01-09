const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game Variables
const gridSize = 20; // Size of each grid cell
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;
let score = 0;

// Pac-Man variables
let pacman = {
  x: 1,
  y: 1,
  dx: 0,
  dy: 0,
};

// Maze represented as a grid (1 = wall, 0 = dot, 2 = empty space)
const maze = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// Draw the maze
function drawMaze() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (maze[row][col] === 1) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
      } else if (maze[row][col] === 0) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(
          col * gridSize + gridSize / 2,
          row * gridSize + gridSize / 2,
          gridSize / 6,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    }
  }
}

// Draw Pac-Man
function drawPacman() {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(
    pacman.x * gridSize + gridSize / 2,
    pacman.y * gridSize + gridSize / 2,
    gridSize / 2,
    0.2 * Math.PI,
    1.8 * Math.PI
  );
  ctx.lineTo(pacman.x * gridSize + gridSize / 2, pacman.y * gridSize + gridSize / 2);
  ctx.fill();
}

// Update Pac-Man's position
function updatePacman() {
  let nextX = pacman.x + pacman.dx;
  let nextY = pacman.y + pacman.dy;

  // Check for collisions with walls
  if (maze[nextY][nextX] !== 1) {
    pacman.x = nextX;
    pacman.y = nextY;

    // Check if Pac-Man eats a dot
    if (maze[nextY][nextX] === 0) {
      maze[nextY][nextX] = 2;
      score++;
    }
  }
}

// Handle keyboard input
function handleKeyPress(event) {
  switch (event.key) {
    case 'ArrowUp':
      pacman.dx = 0;
      pacman.dy = -1;
      break;
    case 'ArrowDown':
      pacman.dx = 0;
      pacman.dy = 1;
      break;
    case 'ArrowLeft':
      pacman.dx = -1;
      pacman.dy = 0;
      break;
    case 'ArrowRight':
      pacman.dx = 1;
      pacman.dy = 0;
      break;
  }
}

document.addEventListener('keydown', handleKeyPress);

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMaze();
  drawPacman();
  updatePacman();
  requestAnimationFrame(gameLoop);
}

gameLoop();
