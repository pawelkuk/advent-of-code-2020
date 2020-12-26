fs = require("fs");

instr2idx = {
  e: (x, y) => [x + 1, y],
  se: (x, y) => [x + 1, y - 1],
  sw: (x, y) => [x, y - 1],
  w: (x, y) => [x - 1, y],
  nw: (x, y) => [x - 1, y + 1],
  ne: (x, y) => [x, y + 1],
};
const toInstr = (str) => {
  let instr = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "w") instr.push("w");
    else if (str[i] === "e") instr.push("e");
    else if (str[i] === "n") {
      if (str[i + 1] === "e") instr.push("ne");
      else if (str[i + 1] === "w") instr.push("nw");
      i++;
    } else if (str[i] === "s") {
      if (str[i + 1] === "e") instr.push("se");
      else if (str[i + 1] === "w") instr.push("sw");
      i++;
    }
  }
  return instr;
};
fs.readFile("./data/input_day24.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let lines = data.split("\n");
  lines = lines.map((line) => toInstr(line));
  console.log(lines);
  const floor = new Map();
  for (line of lines) {
    coords = [0, 0];
    for (instr of line) {
      coords = instr2idx[instr](...coords);
    }
    let key = coords.join();
    if (!floor.has(key)) {
      floor.set(key, 1);
    } else {
      let val = floor.get(key);
      val += 1;
      floor.set(key, val % 2);
    }
  }
  console.log(floor);
  let res = 0;
  for (v of floor.values()) res += v;
  console.log(res);
});
