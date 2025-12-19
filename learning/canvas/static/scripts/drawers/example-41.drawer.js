const example41drawer = (ctx, canvas) => {
  var img = new Image();
  img.src = "assets/rhino.jpg";
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    img.style.display = "none";
  };
  var color = document.getElementById("color");
  function pick(event) {
    // TODO incorrect x & y position
    // var x = event.layerX;
    // var y = event.layerY;
    var x = 200;
    var y = 200;
    var pixel = ctx.getImageData(x, y, 1, 1);
    console.log(x, y);
    var data = pixel.data;
    var rgba =
      "rgba(" +
      data[0] +
      ", " +
      data[1] +
      ", " +
      data[2] +
      ", " +
      data[3] / 255 +
      ")";
    console.log(rgba);
    color.style.background = rgba;
    color.textContent = rgba;
  }
  canvas.addEventListener("mousemove", pick);
};

const example41 = new Example("example-41", example41drawer);
