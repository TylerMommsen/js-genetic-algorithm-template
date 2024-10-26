class Population {
  constructor(size = 100, target, mutationRate = 0.01) {
    this.players = [];
    this.generation = 0;
    this.bestFitness = 0;
    this.target = target;
    this.mutationRate = mutationRate;
    this.size = size;

    this.initializePlayers();
  }

  // create initial population of players
  initializePlayers() {
    for (let i = 0; i < this.size; i++) {
      this.players.push(new Player(null, this.target));
    }
  }

  // update all players
  update() {
    for (let player of this.players) {
      player.update();
    }

    // if all players are dead, start natural selection
    if (this.allPlayersDead()) {
      this.naturalSelection();
    }
  }

  // check if all players are dead
  allPlayersDead() {
    for (let player of this.players) {
      if (!player.isDead() && !player.reachedTarget) {
        return false;
      }
    }
    return true;
  }

  // calculate total fitness
  calculateFitness() {
    let sum = 0;
    for (let player of this.players) {
      sum += player.calculateFitness();
    }

    // normalize fitness values
    for (let player of this.players) {
      player.fitness /= sum;
    }
  }

  // get the best fitness value from the population
  getBestFitness() {
    for (let player of this.players) {
      if (player.fitness > this.bestFitness) {
        this.bestFitness = player.fitness;
      }
    }
    return this.bestFitness;
  }

  // select parent based on fitness (roulette wheel selection)
  selectParent() {
    let r = random(1);
    let sum = 0;
    for (let player of this.players) {
      sum += player.fitness;
      if (sum > r) {
        return player;
      }
    }
    return this.players[0]; // fallback
  }

  // create new generation
  naturalSelection() {
    let newPlayers = [];
    this.calculateFitness();
    this.getBestFitness();

    for (let i = 0; i < this.players.length; i++) {
      let parent = this.selectParent();
      let child = new Player(parent.copyBrain(), this.target);
      child.mutate(this.mutationRate);
      newPlayers.push(child);
    }

    // replace old generation with new generation
    this.players = newPlayers;
    this.generation++;
  }
}
