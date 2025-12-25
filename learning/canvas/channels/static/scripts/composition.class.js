const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 400;

class Composition {
  constructor(canvasId, imageSrc) {
    this.canvasId = canvasId;
    this.imageSrc = imageSrc;
  }

  init() {
    this.#initCanvas();
    this.#initImage();
  }

  #initCanvas() {
    this.canvas = document.getElementById(this.canvasId);
    if (this.canvas.getContext) {
      this.ctx = this.canvas.getContext("2d");
    }
  }

  #initImage() {
    // this.img = new Image();
    this.img = document.querySelector("#source");
    this.img.style.display = "none";
    this.img.onload = this.#onImageLoadHander();
  }

  #onImageLoadHander() {
    this.ctx.drawImage(this.img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);

    const imageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );
    const redLayerArrayData = getRedLayerData(imageData.data);
    const redLayerImageData = new ImageData(
      redLayerArrayData,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
    );

    // setRedImageData(data);
    // setGreenImageData(data);
    // setBlueImageData(data);

    this.ctx.putImageData(redLayerImageData, 0, 0);
  }
}

const bla = () => {
  console.log("bla");
};

const getRedLayerData = (data) => {
  let output = data;
  for (var i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    // const avg = (data[i + 1] + data[i + 2]) / 2;

    // data[i] = 255;
    // data[i + 1] = 255 - avg;
    // data[i + 2] = 255 - avg;

    output[i + 3] = data[i];
    output[i] = 255;
    output[i + 1] = 0;
    output[i + 2] = 0;
  }
  return output;
};
