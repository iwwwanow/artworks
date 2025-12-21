const example30drawer = (ctx) => {
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 83, 71, 104, 124, 21, 20, 87, 104);
  };
  img.src = "assets/gem-1.jpg";
};

const example30 = new Example("example-30", example30drawer);
