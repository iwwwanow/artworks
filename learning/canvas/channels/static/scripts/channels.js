const CANVAS_ID = "channels-canvas";
const IMAGE_WIDTH = 300;
const IMAGE_HEIGHT = 400;

const canvas = document.getElementById(CANVAS_ID);
let ctx;

if (canvas.getContext) {
  ctx = canvas.getContext("2d");
}

const img = new Image();
img.src = "assets/flowers.jpg";
img.onload = () => {
  ctx.drawImage(img, 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT);
  img.style.display = "none";

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const redLayerArrayData = getRedLayerData(imageData.data);
  const redLayerImageData = new ImageData(
    redLayerArrayData,
    IMAGE_WIDTH,
    IMAGE_HEIGHT,
  );

  // setRedImageData(data);
  // setGreenImageData(data);
  // setBlueImageData(data);

  ctx.putImageData(redLayerImageData, 0, 0);
};

const setRedImageData = (data) => {};

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

const setGreenImageData = (data) => {
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i + 1] + data[i + 2]) / 2;

    data[i] = 255 - avg;
    data[i + 1] = 255;
    data[i + 2] = 255 - avg;
  }
};

const setBlueImageData = (data) => {
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i + 1] + data[i + 2]) / 2;

    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = 255;
  }
};

const drawChannelsProject = (img) => {
  ctx.drawImage(img, 0, 0);
};
