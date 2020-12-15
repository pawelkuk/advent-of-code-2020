fs = require("fs");
mask2op = {
  0: () => 1,
  1: () => 1,
  X: () => 1,
};
function toMask(mask) {
  return Array.from(mask);
}
function toMemOp(row) {
  [memAddress] = row.match(/(?<=\[)[0-9]+/gs).map((n) => Number(n));
  [memVal] = row.match(/(?<==\s+)[0-9]+/gs).map((n) => Number(n));
  return [memAddress, memVal];
}
fs.readFile("./data/input_day14.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  data = data.split("\n").map((row) => {
    if (row.startsWith("mask")) return toMask(...row.match(/[0-9X]{36}/gs));
    if (row.startsWith("mem")) return toMemOp(row);
  });
  console.log(data);
});
