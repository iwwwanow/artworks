const example43drawer = (ctx, canvas) => {
  var img = new Image();
  img.src = "assets/rhino.jpg";
  img.onload = function () {
    draw(this);
  };

  function draw(img) {
    ctx.drawImage(img, 0, 0);
    img.style.display = "none";
    var zoomctx = document.getElementById("zoom").getContext("2d");

    var smoothbtn = document.getElementById("smoothbtn");
    var toggleSmoothing = function (event) {
      zoomctx.imageSmoothingEnabled = this.checked;
      zoomctx.mozImageSmoothingEnabled = this.checked;
      zoomctx.webkitImageSmoothingEnabled = this.checked;
      zoomctx.msImageSmoothingEnabled = this.checked;
    };
    smoothbtn.addEventListener("change", toggleSmoothing);

    var zoom = function (event) {
      var x = event.offsetX;
      var y = event.offsetY;
      zoomctx.drawImage(
        canvas,
        Math.abs(x - 5),
        Math.abs(y - 5),
        100,
        100,
        0,
        0,
        600,
        400,
      );
    };

    canvas.addEventListener("mousemove", zoom);
  }
};

const example43 = new Example("example-43", example43drawer);
