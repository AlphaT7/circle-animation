import Canvas from "./modules/canvas.js";
import Animation from "./modules/animation.js";
import Particles from "./modules/particles.js";
import Circles from "./modules/circles.js";
import Radii from "./modules/radii.js";
import Images from "./modules/images.js";

const canvas = new Canvas({ canvasId: "canvas" }).create();
const circles = new Circles({ canvas });
const particles = new Particles({ canvas });
const images = new Images({ canvas });
const radii = new Radii({ canvas });

images.load();
particles.load();
radii.load();

let objArr = [particles, /*circles,*/ images, radii];

let animate = new Animation({ canvas, objArr });
animate.animationLoop.start();
