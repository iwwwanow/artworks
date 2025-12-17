class Example {
  constructor(canvasId, drawer) {
    this.canvas = document.getElementById(canvasId);

    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
      this.drawer = drawer;
    }
  }

  execute() {
    this.drawer(this.ctx, this.canvas);
  }
}
