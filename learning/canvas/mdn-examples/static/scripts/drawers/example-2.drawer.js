const example2drawer = (ctx) => {
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
};

const example2 = new Example("example-2", example2drawer);
