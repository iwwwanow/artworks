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

function draw() {
  drawLessonFactory(1, drawLesson1);
  drawLessonFactory(2, drawLesson2);
  drawLessonFactory(3, drawLesson3);
}
