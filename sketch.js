let population;
let target;
let gameSpeed = 1;

let popSize = 100;
let mutationRate = 0.01;

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;

// setup function to initialize the canvas and population
function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  target = new Target();
  population = new Population(popSize, target, mutationRate);
}

// main game loop
function draw() {
  // game logic
  for (let i = 0; i < gameSpeed; i++) {
    population.update();
  }

  // game display
  background(0);

  for (let player of population.players) {
    player.show();
  }

  // draw target
  target.show();

  // display generation, fitness, and game speed information
  fill(255);
  textSize(16);
  text(`Generation: ${population.generation}`, 10, 20);
  text(`Best Fitness: ${population.getBestFitness().toFixed(2)}`, 10, 40);
  text(`Game Speed: ${gameSpeed}x`, 10, 60);
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    gameSpeed = min(gameSpeed + 1, 10); // increase speed, max 10x
  } else if (keyCode === DOWN_ARROW) {
    gameSpeed = max(gameSpeed - 1, 1); // decrease speed, min 1x
  }
}
