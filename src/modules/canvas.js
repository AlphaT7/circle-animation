export default class Canvas {
  constructor({ canvasId }) {
    this.canvasId = canvasId;
  }

  create() {
    let canvasObj = document.createElement("canvas");
    let ratio =
      window.innerHeight < window.innerWidth
        ? window.innerHeight
        : window.innerWidth;

    canvasObj.style.display = "block";
    canvasObj.id = this.canvasId;
    document.body.append(canvasObj);

    const element = document.getElementById(this.canvasId);
    element.width = ratio;
    element.height = ratio;

    const maximumRadius = ratio * 0.095;
    const centerX = canvasObj.width / 2 + 1;
    const centerY = canvasObj.height / 2 + 1;
    return {
      element,
      maximumRadius: maximumRadius,
      centerX,
      centerY,
    };
  }
}
