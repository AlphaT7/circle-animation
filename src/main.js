import Canvas from "./modules/canvas.js";
import Animation from "./modules/animation.js";
import Particles from "./modules/particles.js";
import Circles from "./modules/circles.js";

const canvas = new Canvas({ canvasName: "canvas" }).create();
const circles = new Circles({ canvas });
const particles = new Particles({ canvas });
particles.create();

let objArr = [particles, circles];

let animate = new Animation({ canvas, objArr });
animate.animationLoop.start();
