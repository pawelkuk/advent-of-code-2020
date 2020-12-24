fs = require("fs");
fs.readFile("./data/input_day22.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let [p1, p2] = data.split("\n\n").map((block) => block.split("\n"));
  [p1, p2] = [p1.slice(1), p2.slice(1)];
  [p1, p2] = [p1.map((n) => Number(n)), p2.map((n) => Number(n))];
  console.log(p1, p2);
  while (p1.length !== 0 && p2.length !== 0) {
    let [c1, c2] = [p1.shift(), p2.shift()];
    if (c1 > c2) p1.push(c1, c2);
    if (c1 < c2) p2.push(c2, c1);
  }
  console.log(p1, p2);
  let score = 0;
  let endArr = [...p1, ...p2];
  console.log(endArr);
  for (let i = endArr.length; i > 0; i--) {
    score += i * endArr[endArr.length - i];
    console.log(i, "*", endArr[i - 1], "=", i * endArr[i - 1], "score:", score);
  }
  console.log(score);
});
