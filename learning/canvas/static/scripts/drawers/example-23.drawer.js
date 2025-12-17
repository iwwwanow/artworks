const example23drawer = (ctx) => {
  // TODO: fix it; didnt work

  // create new image object to use as pattern
  var img = new Image();
  img.src = "assets/gem-1.jpg";
  img.onload = function () {
    // create pattern
    var ptrn = ctx.createPattern(img, "repeat");
    ctx.fillStyle = ptrn;
    ctx.fillRect(0, 0, 150, 150);
  };
};

const example23 = new Example("example-23", example23drawer);
