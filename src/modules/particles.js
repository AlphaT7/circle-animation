export default class Particles {
  constructor({ canvas }) {
    this.canvas = canvas.element;
    this.centerX = canvas.centerX;
    this.centerY = canvas.centerY;
    this.radius = canvas.maximumRadius;
    this.ctx = canvas.element.getContext("2d");
    this.Circles = {
      outer: {
        cx: this.centerX,
        cy: this.centerY,
        start: 0,
        r: (canvas.element.width / 2) * 0.8,
        end: this.toRadians(360),
      },
      innerGap: {
        cx: this.centerX,
        cy: this.centerY,
        start: 0,
        r: (canvas.element.width / 2) * 0.3,
        end: this.toRadians(360),
      },
      inner: {
        cx: this.centerX,
        cy: this.centerY,
        start: 0,
        r: (canvas.element.width / 2) * 0.2,
        end: this.toRadians(360),
      },
    };
    this.ratio = (this.canvas.width / 2) * 0.12;
    this.lineWidth = this.ratio * 0.002;
    this.adjacentRatio = (this.canvas.width / 2) * 0.275;
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

  getRandomInt(max, min) {
    return Math.random() * (max - min) + min;
  }

  getRandomPointInRing(centerX, centerY, innerRadius, outerRadius) {
    for (let i = 0; i <= 360; i += 8) {
      let angle = this.toRadians(i);
      let distance = this.getRandomInt(outerRadius, innerRadius);
      let x = centerX + distance * Math.cos(angle);
      let y = centerY + distance * Math.sin(angle);
      let particle = new Path2D();
      particle.arc(x, y, this.getRandomInt(0.5, 1.75), 0, this.toRadians(360));
      this.Particles.push({ x: x, y: y, particle: particle });
    }
  }

  load() {
    this.getRandomPointInRing(
      this.centerX,
      this.centerY,
      this.Circles.innerGap.r,
      this.Circles.outer.r
    );

    let coordinatePairs = [];

    for (let i = 0; i < this.Particles.length; i++) {
      let adjacentParticles = this.findAdjacentParticles(this.Particles[i]);

      // const TAU = Math.PI * 2;
      let Point = (x, y) => ({ x, y });
      let Ray = (p1, p2) => ({ p1, p2 });
      let Circle = (p, radius) => ({ x: p.x, y: p.y, radius });

      for (let j = 0; j < adjacentParticles.length; j++) {
        let x1 = this.Particles[i].x;
        let y1 = this.Particles[i].y;
        let x2 = adjacentParticles[j].x;
        let y2 = adjacentParticles[j].y;
        const c1 = Circle(
          Point(this.centerX, this.centerY),
          this.Circles.innerGap.r
        );
        const r1 = Ray(Point(x1, y1), Point(x2, y2));

        if (
          // do .some filtering to remove duplicate line coordinates from the array
          !coordinatePairs.some((el) => {
            return el.x1 == adjacentParticles[j].x;
          }) &&
          !this.rayInterceptsCircle(r1, c1)
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

  findAdjacentParticles(selectedParticle) {
    // return particles within "this.ratio" radius of the selectedParticle
    return this.Particles.filter((particle) => {
      return (
        Math.abs(particle.x - selectedParticle.x) < this.adjacentRatio &&
        Math.abs(particle.y - selectedParticle.y) < this.adjacentRatio
      );
    });
  }

  rayInterceptsCircle(ray, circle) {
    const dx = ray.p2.x - ray.p1.x;
    const dy = ray.p2.y - ray.p1.y;
    const u = Math.min(
      1,
      Math.max(
        0,
        ((circle.x - ray.p1.x) * dx + (circle.y - ray.p1.y) * dy) /
          (dy * dy + dx * dx)
      )
    );
    const nx = ray.p1.x + dx * u - circle.x;
    const ny = ray.p1.y + dy * u - circle.y;
    return nx * nx + ny * ny < circle.radius * circle.radius;
  }

  update() {}

  render(ctx) {
    // let outer = this.getCirclePath().outerRing;
    ctx.strokeStyle = "#fff";
    let inner = this.getCirclePath().innerRing;
    ctx.lineWidth = 0.5;
    // ctx.stroke(outer);
    ctx.stroke(inner);

    for (let i = 0; i < 3; i++) {
      this.Particles.forEach((obj) => {
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 5;
        ctx.fillStyle = "#fff";
        ctx.fill(obj.particle);
      });

      this.particleLines.forEach((obj) => {
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 5;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = this.lineWidth;
        ctx.stroke(obj);
      });
    }
  }
}
