fs = require("fs");
let game = 0;

const playGame = (p1, p2) => {
  let memory = new Map();
  let cnt = 0;
  game++;
  if (game % 10 === 0) console.log("game", game, "round", cnt);
  while (p1.length !== 0 && p2.length !== 0) {
    cnt++;
    // console.log("game", game, "round", cnt);
    key = p1.join(",") + " " + p2.join(",");
    if (memory.has(key)) return [p1, 1];
    memory.set(key, true);
    let [c1, c2] = [p1.shift(), p2.shift()];
    // console.log(c1, p1, c2, p2);

    if (c1 <= p1.length && c2 <= p2.length) {
      let [arr, winner] = playGame(p1.slice(0, c1), p2.slice(0, c2));
      if (winner === 1) p1.push(c1, c2);
      if (winner === 2) p2.push(c2, c1);
    } else {
      if (c1 > c2) p1.push(c1, c2);
      if (c1 < c2) p2.push(c2, c1);
    }
  }
  if (p1.length === 0) return [p2, 2];
  if (p2.length === 0) return [p1, 1];
};
fs.readFile("./data/input_day22.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let [p1, p2] = data.split("\n\n").map((block) => block.split("\n"));
  [p1, p2] = [p1.slice(1), p2.slice(1)];
  [p1, p2] = [p1.map((n) => Number(n)), p2.map((n) => Number(n))];
  console.log(p1, p2);
  let [endArr, winner] = playGame(p1, p2);
  let score = 0;
  console.log(endArr);
  for (let i = endArr.length; i > 0; i--) {
    score += i * endArr[endArr.length - i];
    console.log(i, "*", endArr[i - 1], "=", i * endArr[i - 1], "score:", score);
  }
  console.log(score);
});
