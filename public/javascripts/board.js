function RandomizePosition() {
  let y = 6 * Math.random();
  let x = 60 * Math.random();
  question.style.top = y + "rem";
  question.style.left = x + "rem";
}

RandomizePosition();
