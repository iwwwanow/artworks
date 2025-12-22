const CANVAS_ID = "channels-canvas";

const canvas = document.getElementById(CANVAS_ID);
let ctx;

if (canvas.getContext) {
  ctx = canvas.getContext("2d");
}

const img = new Image();
img.src = "assets/flowers.jpg";
img.onload = () => {
  ctx.drawImage(img, 0, 0, 300, 400);
  img.style.display = "none";

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  console.log(data);

  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;

    data[i] = 255;
    data[i + 1] = avg * 1.5;
    data[i + 2] = avg * 1.5;
  }
  ctx.putImageData(imageData, 0, 0);
};

const drawChannelsProject = (img) => {
  ctx.drawImage(img, 0, 0);
};
