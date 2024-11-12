export default class Particles {
  constructor({ canvas }) {
    this.centerX = canvas.centerX;
    this.centerY = canvas.centerY;
    this.radius = canvas.maximumRadius;
    this.ctx = canvas.element.getContext("2d");
    this.Circles = {
      outer: {
        cx: this.centerX,
        cy: this.centerY,
        start: 0,
        r: 200,
        end: this.toRadians(360),
      },
      inner: {
        cx: this.centerX,
        cy: this.centerY,
        start: 0,
        r: 100,
        end: this.toRadians(360),
      },
    };

    this.arcArray = [
      {
        start: 40,
        end: 160,
        radius: this.radius * 4.75,
        width: 3,
        step: 1,
      },
      {
        start: 215,
        end: 320,
        radius: this.radius * 4.5,
        width: 2,
        step: 1,
      },
      { start: 35, end: 120, radius: this.radius * 4, width: 3, step: 1.5 },
      {
        start: 110,
        end: 195,
        radius: this.radius * 3.75,
        width: 2,
        step: 1,
      },
      { start: 210, end: 275, radius: this.radius * 5, width: 4, step: 1.5 },
    ];
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  update() {
    this.arcArray.forEach((arc, i) => {
      let startDegrees = arc.start + arc.step;
      let endDegrees = arc.end + arc.step;
      arc.start = startDegrees < 360 ? startDegrees : startDegrees - 360;
      arc.end = endDegrees < 360 ? endDegrees : endDegrees - 360;
    });
  }

  render(ctx) {
    this.arcArray.forEach((arc) => {
      ctx.shadowColor = "#fff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = arc.width;
      ctx.shadowBlur = 5;
      ctx.beginPath();
      ctx.arc(
        this.centerX,
        this.centerY,
        arc.radius,
        this.toRadians(arc.start),
        this.toRadians(arc.end)
      );
      ctx.stroke();
    });
  }
}
