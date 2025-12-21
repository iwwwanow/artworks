const example3drawer = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
};

const example3 = new Example("example-3", example3drawer);
