export default class Images {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.image;
    this.centerX;
    this.centerY;
    this.imgW;
    this.imgH;
    this.renderImage = false;
  }

  load() {
    this.image = new Image();
    this.image.src = "./w.png";

    this.image.addEventListener("load", () => {
      let ratio = this.image.height / this.image.width;
      this.imgW = this.canvas.element.width / 7;
      this.imgH = this.imgW * ratio;
      this.centerX = this.canvas.centerX - this.imgW / 2;
      this.centerY = this.canvas.centerY - this.imgH / 2 + 5;
      this.renderImage = true;
    });
  }

  update() {
    // this.centerX = this.canvas.centerX - this.image.width / 2;
    // this.centerY = this.canvas.centerY - this.image.height / 2 + 10;
  }

  render(ctx) {
    // if (this.renderImage) ctx.drawImage(this.image, this.centerX, this.centerY);
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    if (this.renderImage)
      ctx.drawImage(
        this.image,
        0,
        0,
        this.image.width,
        this.image.height,
        this.centerX,
        this.centerY,
        this.imgW,
        this.imgH
      );
  }
}
