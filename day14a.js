fs = require("fs");
let mask = [];
mask2op = {
  0: (val) => "0",
  1: (val) => "1",
  X: (val) => val,
};
function toMask(mask) {
  return Array.from(mask);
}
function toMemOp(row) {
  [memAddress] = row.match(/(?<=\[)[0-9]+/gs).map((n) => Number(n));
  [memVal] = row
    .match(/(?<==\s+)[0-9]+/gs)
    .map((n) => Array.from(Number(n).toString(2).padStart(36, "0")));
  return [memAddress, memVal];
}
function maskVal(val) {
  return val.map((v, idx) => mask2op[mask[idx]](v));
}
function toDecimal(vals) {
  let bin = vals.join("");
  return parseInt(bin, 2);
}
fs.readFile("./data/input_day14.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  data = data.split("\n").map((row) => {
    if (row.startsWith("mask")) return toMask(...row.match(/[0-9X]{36}/gs));
    if (row.startsWith("mem")) return toMemOp(row);
  });
  let memory = {};
  for (instr of data) {
    if (instr.length > 2) mask = instr;
    else {
      [memAddress, memVal] = instr;
      memory[memAddress] = maskVal(memVal);
    }
  }
  let res = 0;

  for (const address in memory) {
    res += toDecimal(memory[address]);
  }
  console.log(res);
});
