fs = require("fs");
const ang2dir = {
  0: () => ([wEast, wNorth] = [wEast, wNorth]),
  90: () => ([wEast, wNorth] = [-wNorth, wEast]),
  180: () => ([wEast, wNorth] = [-wEast, -wNorth]),
  270: () => ([wEast, wNorth] = [wNorth, -wEast]),
};
let [sEast, sNorth] = [0, 0];
let [wEast, wNorth] = [10, 1];

const operations = {
  N: (arg) => (wNorth += arg),
  E: (arg) => (wEast += arg),
  W: (arg) => (wEast -= arg),
  S: (arg) => (wNorth -= arg),
  L: (arg) => ang2dir[arg](),
  R: (arg) => ang2dir[360 - arg](),
  F: (arg) => {
    sEast += arg * wEast;
    sNorth += arg * wNorth;
  },
};
fs.readFile("./data/input_day12.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let instructions = data
    .split("\n")
    .map((instr) => [instr[0], Number(instr.slice(1))]);
  for ([instr, arg] of instructions) {
    operations[instr](arg);
  }
  console.log(Math.abs(sEast) + Math.abs(sNorth));
});
