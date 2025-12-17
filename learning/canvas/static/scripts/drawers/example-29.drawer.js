const example29drawer = (ctx) => {
  var img = new Image();
  img.onload = function () {
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        ctx.drawImage(img, j * 50, i * 38, 50, 38);
      }
    }
  };
  img.src = "assets/backdrop.png";
};

const example29 = new Example("example-29", example29drawer);
