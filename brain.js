// brain class represents the decision-making component of each player
class Brain {
  constructor(size) {
    this.directions = []; // array to store movement directions
    this.step = 0; // current step in the sequence of directions
    // initialize directions with random vectors
    for (let i = 0; i < size; i++) {
      this.directions[i] = p5.Vector.random2D();
    }
  }

  // create a copy of the brain
  copy() {
    let newBrain = new Brain(this.directions.length);
    // copy each direction vector to the new brain
    for (let i = 0; i < this.directions.length; i++) {
      newBrain.directions[i] = this.directions[i].copy();
    }
    return newBrain;
  }

  // mutate the brain's directions
  mutate(mutationRate = 0.01) {
    for (let i = 0; i < this.directions.length; i++) {
      // randomly mutate directions based on mutation rate
      if (random(1) < mutationRate) {
        this.directions[i] = p5.Vector.random2D();
      }
    }
  }
}
