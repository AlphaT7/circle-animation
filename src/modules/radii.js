export default class Radii {
  constructor({ canvas }) {
    this.canvas = canvas.element;
    this.centerX = canvas.centerX;
    this.centerY = canvas.centerY;
    this.ratio = (this.canvas.width / 2) * 0.12;
    this.radii = [];
    this.circles = [];
    this.fontRatio = this.canvas.width * 0.025;
    this.font = this.fontRatio + "px Ariel";
    this.textRingPositions = [];
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  createLines(
    innerRatio,
    outerRation,
    angleStart,
    angleEnd,
    increment,
    lineWidth
  ) {
    let innerRadius = (this.canvas.width / 2) * innerRatio;
    let outerRadius = (this.canvas.width / 2) * outerRation;

    for (let i = angleStart; i <= angleEnd; i += increment) {
      let angle = this.toRadians(i);
      let startDistance = innerRadius;
      let endDistance = outerRadius;
      let x1 = this.centerX + startDistance * Math.cos(angle);
      let y1 = this.centerY + startDistance * Math.sin(angle);

      let x2 = this.centerX + endDistance * Math.cos(angle);
      let y2 = this.centerY + endDistance * Math.sin(angle);

      let radii = new Path2D();
      radii.moveTo(x1, y1);
      radii.lineTo(x2, y2);
      this.radii.push({ lineWidth: lineWidth, radii: radii });
    }
  }

  calculateTextPositions() {
    let text = "";
    let radius = (this.canvas.width / 2) * 0.835;
    let startAngle = 0;

    for (let i = 0; i < this.canvas.width * 0.25; i++) {
      let even = i % 2 === 0;
      if (even) {
        text += "0";
      } else {
        text += "1";
      }
    }

    const anglePerChar = (2 * Math.PI) / text.length;

    for (let i = 0; i < text.length - 37; i++) {
      const angle = startAngle + i * anglePerChar;

      this.textRingPositions.push({
        char: text[i],
        x: this.centerX + Math.cos(angle) * radius,
        y: this.centerY + Math.sin(angle) * radius,
        rotation: angle + Math.PI / 2,
        // Add additional properties as needed
        originalIndex: i,
        radius: radius,
        centerX: this.centerX,
        centerY: this.centerY,
      });
    }
  }

  load() {
    // (innerRatio, outerRation, angleStart, angleEnd, increment, lineWidth);
    let ratio = this.canvas.width / 2;
    this.createLines(0.18, 0.195, 185, 270, 5, ratio * 0.0045);
    this.createLines(0.59, 0.55, 39, 270, 2.5, 1.5);

    this.createLines(0.82, 0.825, 0, 90, 1.8, 1.5);
    this.createLines(0.82, 0.825, 180, 360, 1.8, 1.5);

    this.createLines(0.9, 0.905, 185, 270, 1.5, 1.5);
    this.createLines(0.92, 0.95, 185, 270, 1.5, 3.5);
    this.createLines(0.965, 0.97, 1, 360, 1.5, 1.5);
    this.calculateTextPositions();
  }

  update() {}

  render(ctx) {
    for (let i = 0; i < this.radii.length; i++) {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = this.radii[i].lineWidth;
      ctx.stroke(this.radii[i].radii);
    }

    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";

    this.textRingPositions.forEach((pos) => {
      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(pos.rotation);
      ctx.fillText(pos.char, 0, 0);
      ctx.restore();
    });
  }
}
