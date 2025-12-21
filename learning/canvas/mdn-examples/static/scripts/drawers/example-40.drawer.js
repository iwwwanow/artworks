var raf;
var running = false;

const example40drawer = (ctx, canvas) => {
  var ball = {
    x: 100,
    y: 100,
    vx: 5,
    vy: 2,
    radius: 25,
    color: "blue",
    draw: function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
      ctx.closePath();
      ctx.fillStyle = this.color;
      ctx.fill();
    },
  };

  function draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    ball.x += ball.vx;
    ball.y += ball.vy;

    if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
      ball.vy = -ball.vy;
    }
    if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
      ball.vx = -ball.vx;
    }

    ball.vy *= 0.99;
    ball.vy += 0.25;

    raf = window.requestAnimationFrame(draw);
  }

  canvas.addEventListener("mouseover", function (e) {
    raf = window.requestAnimationFrame(draw);
  });

  canvas.addEventListener("mouseout", function (e) {
    window.cancelAnimationFrame(raf);
  });

  function clear() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // canvas.addEventListener("mousemove", function (e) {
  //   if (!running) {
  //     clear();
  //     ball.x = e.clientX;
  //     ball.y = e.clientY;
  //     ball.draw();
  //   }
  // });
  //
  // canvas.addEventListener("click", function (e) {
  //   if (!running) {
  //     raf = window.requestAnimationFrame(draw);
  //     running = true;
  //   }
  // });
  //
  // canvas.addEventListener("mouseout", function (e) {
  //   window.cancelAnimationFrame(raf);
  //   running = false;
  // });

  ball.draw();
};

const example40 = new Example("example-40", example40drawer);
