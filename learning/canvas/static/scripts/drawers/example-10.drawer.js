const example10drawer = (ctx) => {
  // INFO: Path2D
  var rectangle = new Path2D();
  rectangle.rect(10, 10, 50, 50);

  var circle = new Path2D();
  circle.moveTo(125, 35);
  circle.arc(100, 35, 25, 0, 2 * Math.PI);

  var p = new Path2D("M10 10 h 80 v 80 h -80 Z");

  ctx.stroke(rectangle);
  ctx.fill(circle);
  ctx.stroke(p);
};

const example10 = new Example("example-10", example10drawer);
