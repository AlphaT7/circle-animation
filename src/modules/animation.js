export default class Animation {
  constructor({ canvas, objArr }) {
    this.objArr = objArr;
    this.canvas = canvas.element;
    this.ctx = this.canvas.getContext("2d");
  }

  animationLoop = {
    lastTick: performance.now(),
    frame: () => {},
    start: () => {
      this.animationLoop.frame = window.requestAnimationFrame(
        this.animationLoop.tick
      );
    },
    stop: () => {
      window.cancelAnimationFrame(animationLoop.frame);
    },
    update: () => {
      this.objArr.forEach((obj) => {
        obj.update();
      });
    },
    render: () => {
      this.objArr.forEach((obj) => {
        obj.render(this.ctx);
      });
    },
    tick: (now) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.animationLoop.update();
      this.animationLoop.render();
      this.animationLoop.lastTick = now;
      this.animationLoop.frame = window.requestAnimationFrame(
        this.animationLoop.tick
      );
    },
  };
}
