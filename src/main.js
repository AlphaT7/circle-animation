import Canvas from "./modules/canvas.js";
import Animation from "./modules/animation.js";
import Particles from "./modules/particles.js";
import Circles from "./modules/circles.js";
import Images from "./modules/images.js";

const canvas = new Canvas({ canvasId: "canvas" }).create();
const circles = new Circles({ canvas });
const particles = new Particles({ canvas });
const images = new Images({ canvas });

images.load();
particles.create();

let objArr = [particles, circles, images];

let animate = new Animation({ canvas, objArr });
animate.animationLoop.start();
