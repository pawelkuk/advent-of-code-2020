fs = require("fs");
const ang2dir = {
  0: "E",
  90: "N",
  180: "W",
  270: "S",
};
let currDirection = 0;
let [east, north] = [0, 0];
const operations = {
  N: (arg) => (north += arg),
  E: (arg) => (east += arg),
  W: (arg) => (east -= arg),
  S: (arg) => (north -= arg),
  L: (arg) => (currDirection = (currDirection + arg) % 360),
  R: (arg) => (currDirection = (currDirection - arg + 360) % 360),
  F: (arg) => operations[ang2dir[currDirection]](arg),
};
fs.readFile("./data/input_day12.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let instructions = data
    .split("\n")
    .map((instr) => [instr[0], Number(instr.slice(1))]);
  for ([instr, arg] of instructions) operations[instr](arg);

  console.log(Math.abs(east) + Math.abs(north));
});
