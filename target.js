class Target {
  constructor() {
    this.pos = createVector(width / 2, 50);
    this.size = 20;
  }

  show() {
    push();
    fill(255, 0, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.size);
    pop();
  }

  update() {
    // this method can be used to implement dynamic behavior for the target
    // for now, it's empty as the target is stationary
  }
}
