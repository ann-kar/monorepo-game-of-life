export class Cell {
  constructor(public state: 0 | 1 | number, private neighbors: number) {}

  getState() {
    return this.state;
  }

  changeState() {
    this.state === 1 ? (this.state = 0) : (this.state = 1);
    return this;
  }

  tick() {
    if (this.neighbors === 3) {
      this.state = 1;
    } else if (this.neighbors === 2 && this.state === 1) {
      this.state = 1;
    } else {
      this.state = 0;
    }
    return this;
  }
}
