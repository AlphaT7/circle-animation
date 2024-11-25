export default class Images {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.images = ["w3.png", "bubble.png"];
  }

  async sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  load() {
    this.images.forEach(async (image, i) => {
      let adjustment = 5;
      let w_admustment = 7;
      if (i == 1) {
        adjustment = 0;
        w_admustment = 5.9;
        await this.sleep(100);
      }
      this[image] = new Image();
      this[image].src = "./" + image;
      this[image].addEventListener("load", () => {
        let ratio = this[image].height / this[image].width;
        this[image].imgW = this.canvas.element.width / w_admustment;
        this[image].imgH = this[image].imgW * ratio;
        this[image].centerX = this.canvas.centerX - this[image].imgW / 2;
        this[image].centerY =
          this.canvas.centerY - this[image].imgH / 2 + adjustment;
      });
    });
    this.renderImage = true;
    // this.image_W = new Image();
    // this.image_W.src = "./w2.png";
    // this.image_W.addEventListener("load", () => {
    //   let ratio = this.image_W.height / this.image_W.width;
    //   this.imgW = this.canvas.element.width / 7;
    //   this.imgH = this.imgW * ratio;
    //   this.centerX = this.canvas.centerX - this.imgW / 2;
    //   this.centerY = this.canvas.centerY - this.imgH / 2 + 5;
    //   this.renderImage = true;
    // });
  }

  update() {}

  render(ctx) {
    this.images.forEach((image) => {
      ctx.shadowBlur = 0;
      if (!this[image]) return;
      ctx.drawImage(
        this[image],
        0,
        0,
        this[image].width,
        this[image].height,
        this[image].centerX,
        this[image].centerY,
        this[image].imgW,
        this[image].imgH
      );
    });

    // ctx.drawImage(
    //   this.image_W,
    //   0,
    //   0,
    //   this.image_W.width,
    //   this.image_W.height,
    //   this.centerX,
    //   this.centerY,
    //   this.imgW,
    //   this.imgH
    // );
  }
}
