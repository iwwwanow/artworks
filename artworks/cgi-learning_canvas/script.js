const drawLessonFactory = (lessonId, callback) => {
  const canvas = document.getElementById(`lesson-${lessonId}`);
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    callback(ctx);
  }
};

function drawLesson1(ctx) {
  ctx.fillStyle = "rgb(200,0,0)";
  ctx.fillRect(10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 55, 50);
}

function drawLesson2(ctx) {
  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
}

function drawLesson3(ctx) {
  ctx.beginPath();
  ctx.moveTo(75, 50);
  ctx.lineTo(100, 75);
  ctx.lineTo(100, 25);
  ctx.fill();
}

function drawLesson4(ctx) {
  ctx.beginPath();
  ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Внешняя окружность
  ctx.moveTo(110, 75);
  ctx.arc(75, 75, 35, 0, Math.PI, false); // рот (по часовой стрелке)
  ctx.moveTo(65, 65);
  ctx.arc(60, 65, 5, 0, Math.PI * 2, true); // Левый глаз
  ctx.moveTo(95, 65);
  ctx.arc(90, 65, 5, 0, Math.PI * 2, true); // Правый глаз
  ctx.stroke();
}

function drawLesson5(ctx) {
  // Filled triangle
  ctx.beginPath();
  ctx.moveTo(25, 25);
  ctx.lineTo(105, 25);
  ctx.lineTo(25, 105);
  ctx.fill();

  // Stroked triangle
  ctx.beginPath();
  ctx.moveTo(125, 125);
  ctx.lineTo(125, 45);
  ctx.lineTo(45, 125);
  ctx.closePath();
  ctx.stroke();
}

function draw() {
  drawLessonFactory(1, drawLesson1);
  drawLessonFactory(2, drawLesson2);
  drawLessonFactory(3, drawLesson3);
  drawLessonFactory(4, drawLesson4);
  drawLessonFactory(5, drawLesson5);
}
