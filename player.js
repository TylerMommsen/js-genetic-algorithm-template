// class representing a player in the genetic algorithm simulation
class Player {
  constructor(brain = null, target) {
    // initialize player's position, velocity, and acceleration
    this.pos = createVector(width / 2, height - 20);
    this.vel = createVector();
    this.acc = createVector();
    this.size = 20; // player's size
    this.fitness = 0; // fitness score
    this.dead = false; // player's state
    this.brain = brain ? brain.copy() : new Brain(1000); // player's brain (decision-making component)
    this.step = 0; // current step in the sequence of directions
    this.reachedTarget = false; // flag to check if player has reached the target
    this.target = target;
    this.startTime = millis(); // record start time
  }

  // update player's state and position
  update() {
    if (!this.dead && !this.reachedTarget) {
      this.move();
      this.checkBoundaries();
      this.checkTarget(this.target);
      this.step++;
      // check if player has completed all steps
      if (this.step >= this.brain.directions.length) {
        this.dead = true;
      }
    }
  }

  // move the player based on brain's directions
  move() {
    if (this.step < this.brain.directions.length) {
      this.acc = this.brain.directions[this.step];
      this.vel.add(this.acc);
      this.vel.limit(20); // limit velocity
      this.pos.add(this.vel);
    }
  }

  // check if player has hit the canvas boundaries
  checkBoundaries() {
    if (
      this.pos.x < 0 ||
      this.pos.x > width ||
      this.pos.y < 0 ||
      this.pos.y > height
    ) {
      this.dead = true;
    }
  }

  // check if player has reached the target
  checkTarget(target) {
    let d = dist(this.pos.x, this.pos.y, target.pos.x, target.pos.y);
    if (d < target.size / 2) {
      this.reachedTarget = true;
    }
  }

  // calculate fitness score for the player
  calculateFitness() {
    let d = dist(this.pos.x, this.pos.y, this.target.pos.x, this.target.pos.y);
    let maxDistance = dist(0, 0, width, height);
    let distanceScore = map(d, 0, maxDistance, 1, 0);

    let timeScore = 0;
    if (this.reachedTarget) {
      let timeTaken = (millis() - this.startTime) / 1000; // time in seconds
      timeScore = map(timeTaken, 0, this.brain.directions.length / 60, 1, 0); // assuming 60 fps
    }

    if (this.reachedTarget) {
      this.fitness = 1 + distanceScore + timeScore;
    } else {
      this.fitness = distanceScore;
    }

    if (this.dead) {
      this.fitness /= 2; // reduce fitness if player is dead
    }

    return this.fitness;
  }

  // check if player is dead
  isDead() {
    return this.dead;
  }

  // mutate player's brain
  mutate(mutationRate) {
    this.brain.mutate(mutationRate);
  }

  // display the player on the canvas
  show() {
    push();
    fill(255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }

  // crossover player's brain with another player's brain
  crossover(partner) {
    let child = new Brain(this.brain.directions.length);
    for (let i = 0; i < child.directions.length; i++) {
      child.directions[i] = random(
        this.brain.directions[i],
        partner.brain.directions[i]
      );
    }
    return child;
  }

  // copy player's brain
  copyBrain() {
    return this.brain.copy();
  }
}
