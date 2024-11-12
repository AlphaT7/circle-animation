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
    this.Particles = [];
    this.particleLines = [];
  }

  getCirclePath() {
    let outer = this.Circles.outer;
    let inner = this.Circles.inner;

    let outerRing = new Path2D();
    let innerRing = new Path2D();

    outerRing.arc(outer.cx, outer.cy, outer.r, outer.start, outer.end);
    innerRing.arc(inner.cx, inner.cy, inner.r, inner.start, inner.end);
    return { outerRing, innerRing };
  }

  getRandomPointInRing(centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i <= 360; i += 10) {
      let angle = this.toRadians(i);
      let distance = Math.random() * (outerRadius - innerRadius) + innerRadius;
      let x = centerX + distance * Math.cos(angle);
      let y = centerY + distance * Math.sin(angle);
      let particle = new Path2D();
      particle.arc(x, y, 2, 0, this.toRadians(360));
      this.Particles.push({ x: x, y: y, particle: particle });
    }
  }

  create() {
    this.getRandomPointInRing(
      this.centerX,
      this.centerY,
      this.Circles.inner.r,
      this.Circles.outer.r
    );

    let coordinatePairs = [];

    for (let i = 0; i < this.Particles.length; i++) {
      let adjacentParticles = this.findAdjacentParticles(this.Particles[i]);

      for (let j = 0; j < adjacentParticles.length; j++) {
        if (
          // do .some filtering to remove duplicate line coordinates from the array
          !coordinatePairs.some((el) => {
            return el.x1 == adjacentParticles[j].x;
          })
        ) {
          coordinatePairs.push({
            x1: this.Particles[i].x,
            y1: this.Particles[i].y,
            x2: adjacentParticles[j].x,
            y2: adjacentParticles[j].y,
          });
        }
      }
    }

    coordinatePairs.forEach((pair) => {
      let line = new Path2D();
      line.moveTo(pair.x1, pair.y1);
      line.lineTo(pair.x2, pair.y2);
      this.particleLines.push(line);
    });
  }

  toRadians(angle) {
    return angle * (Math.PI / 180);
  }

  update() {}

  findAdjacentParticles(selectedParticle) {
    // return particles within 85px radius of the selectedParticle
    return this.Particles.filter((particle) => {
      return (
        Math.abs(particle.x - selectedParticle.x) < 85 &&
        Math.abs(particle.y - selectedParticle.y) < 85
      );
    });
  }

  render(ctx) {
    let outer = this.getCirclePath().outerRing;
    let inner = this.getCirclePath().innerRing;

    ctx.stroke(outer);
    ctx.stroke(inner);

    this.Particles.forEach((obj) => {
      ctx.fillStyle = "#fff";
      ctx.fill(obj.particle);
    });

    this.particleLines.forEach((obj) => {
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 0.1;
      ctx.stroke(obj);
    });
  }
}
