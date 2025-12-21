const example34drawer = (ctx) => {
  // рисуем масштабированный прямоугольник.
  ctx.save();
  ctx.scale(10, 3);
  ctx.fillRect(1, 10, 10, 10);
  ctx.restore();

  // размещаем текст, отражённый по горизонтали
  ctx.scale(-1, 1);
  ctx.font = "48px serif";
  ctx.fillText("MDN", -135, 120);
};

const example34 = new Example("example-34", example34drawer);
