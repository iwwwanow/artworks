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

    const redLayerArrayData = this.#getRedLayerData(imageData.data);
    const greenLayerArrayData = this.#getGreenLayerData(imageData.data);
    const blueLayerArrayData = this.#getBlueLayerData(imageData.data);

    const mergedLayersArrayData = this.#mergeLayers({
      redLayerData: redLayerArrayData,
      greenLayerData: greenLayerArrayData,
      blueLayerData: blueLayerArrayData,
    });

    const mergedLayersImageData = new ImageData(
      mergedLayersArrayData,
      IMAGE_WIDTH,
      IMAGE_HEIGHT,
    );

    this.ctx.putImageData(mergedLayersImageData, 0, 0);
  }

  #getRedLayerData(data) {
    const output = new Uint8ClampedArray(data.length);
    for (let i = 0; i < data.length; i += 4) {
      output[i + 3] = data[i];

      output[i] = 255;
      output[i + 1] = 0;
      output[i + 2] = 0;
    }
    return output;
  }

  #getGreenLayerData(data) {
    const output = new Uint8ClampedArray(data.length);
    for (let i = 0; i < data.length; i += 4) {
      output[i + 3] = data[i + 1];

      output[i] = 0;
      output[i + 1] = 255;
      output[i + 2] = 0;
    }
    return output;
  }

  #getBlueLayerData(data) {
    let output = new Uint8ClampedArray(data.length);
    for (let i = 0; i < data.length; i += 4) {
      output[i + 3] = data[i + 2];

      output[i] = 0;
      output[i + 1] = 0;
      output[i + 2] = 255;
    }
    return output;
  }

  #mergeLayers({ redLayerData, greenLayerData, blueLayerData }) {
    let backgroundLayerData = new Uint8ClampedArray(redLayerData.length);
    backgroundLayerData.fill(255);

    const layersData = [
      // backgroundLayerData,
      redLayerData,
      greenLayerData,
      blueLayerData,
    ];
    let output2 = new Uint8ClampedArray(redLayerData.length);

    output2 = layersData.reduce((backgroundLayerData, forwardLayerData) => {
      let output = new Uint8ClampedArray(redLayerData.length);

      console.log("backgroundLayerData:");
      console.log(backgroundLayerData);

      for (let i = 0; i < redLayerData.length; i += 4) {
        const redIndex = i;
        const greenIndex = i + 1;
        const blueIndex = i + 2;
        const alphaIndex = i + 3;

        const forwardLayerRed = forwardLayerData[redIndex] / 255;
        const forwardLayerGreen = forwardLayerData[greenIndex] / 255;
        const forwardLayerBlue = forwardLayerData[blueIndex] / 255;
        const forwardLayerAlpha = forwardLayerData[alphaIndex] / 255;
        const forwardLayerAlphaNormal = forwardLayerAlpha / 255;

        const backgroundLayerRed = backgroundLayerData[redIndex] / 255;
        const backgroundLayerGreen = backgroundLayerData[greenIndex] / 255;
        const backgroundLayerBlue = backgroundLayerData[blueIndex] / 255;
        const backgroundLayerAlpha = backgroundLayerData[alphaIndex] / 255;
        const backgroundLayerAlphaNormal =
          backgroundLayerData[alphaIndex] / 255;

        const resultAlpha =
          forwardLayerAlpha + backgroundLayerAlpha * (1 - forwardLayerAlpha);

        const getResultColor = (
          foregroundColor,
          foregroundAlpha,
          backgroundColor,
          backgroundAlpha,
          resultAlpha,
        ) => {
          const result =
            (foregroundColor * foregroundAlpha +
              backgroundColor * backgroundAlpha * (1 - foregroundAlpha)) /
            resultAlpha;
          return result * 255;
        };

        const redResult = getResultColor(
          forwardLayerRed,
          forwardLayerAlpha,
          backgroundLayerRed,
          backgroundLayerAlpha,
          resultAlpha,
        );

        const greenResult = getResultColor(
          forwardLayerGreen,
          forwardLayerAlpha,
          backgroundLayerGreen,
          backgroundLayerAlpha,
          resultAlpha,
        );

        const blueResult = getResultColor(
          forwardLayerBlue,
          forwardLayerAlpha,
          backgroundLayerBlue,
          backgroundLayerAlpha,
          resultAlpha,
        );

        // const redResult =
        //   forwardLayerRed * forwardLayerAlphaNormal +
        //   backgroundLayerRed *
        //     backgroundLayerAlphaNormal *
        //     (1 - backgroundLayerAlphaNormal);

        // const greenResult =
        //   forwardLayerGreen * forwardLayerAlphaNormal +
        //   backgroundLayerGreen *
        //     backgroundLayerAlphaNormal *
        //     (1 - backgroundLayerAlphaNormal);

        // const blueResult =
        //   forwardLayerData[blueIndex] * (forwardLayerData[alphaIndex] / 255) +
        //   backgroundLayerData[blueIndex] *
        //     (backgroundLayerData[alphaIndex] / 255) *
        //     (1 - backgroundLayerData[alphaIndex] / 255);

        // const alphaResult =
        //   forwardLayerData[alphaIndex] +
        //   backgroundLayerData[alphaIndex] *
        //     (1 - forwardLayerData[alphaIndex] / 255);

        output[redIndex] = redResult;
        output[greenIndex] = greenResult;
        output[blueIndex] = blueResult;
        // output[alphaIndex] = alphaResult;
        // output[greenIndex] = 0;
        output[alphaIndex] = resultAlpha * 255;
      }

      console.log("output:");
      console.log(output);
      return output;
    });

    return output2;
  }
}
