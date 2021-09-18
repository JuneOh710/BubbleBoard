function RandomizePosition() {
  buble = document.getElementById("buble");
  let y = 31 * Math.random() + 16;
  let x = 113 * Math.random();
  question.style.top = y + "rem";
  question.style.left = x + "rem";

  //   buble = document.getElementById("buble");
  //   buble.style.top = y + "rem";
  //   buble.style.left = x + "rem";
  //   console.log(x, y);
  //   console.log(question.style.top, question.style.left);
  //   console.log(buble.style.top, buble.style.left);
}

RandomizePosition();
