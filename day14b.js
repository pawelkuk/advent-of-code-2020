fs = require("fs");
let mask = [];
mask2op = {
  0: (val) => val,
  1: (val) => "1",
  X: (val) => "X",
};
function toMask(mask) {
  return Array.from(mask);
}
function toMemOp(row) {
  [memAddress] = row
    .match(/(?<=\[)[0-9]+/gs)
    .map((n) => Array.from(Number(n).toString(2).padStart(36, "0")));
  [memVal] = row.match(/(?<==\s+)[0-9]+/gs).map((n) => Number(n));
  return [memAddress, memVal];
}
function maskAddress(addr) {
  addr = addr.map((v, idx) => mask2op[mask[idx]](v));
  addresses = [addr];
  for (i = 0; i < 36; i++) {
    newAddresses = [];
    for (a of addresses)
      if (a[i] === "X") {
        a0 = [...a];
        a0[i] = "0";
        a1 = [...a];
        a1[i] = "1";
        newAddresses.push(a0, a1);
      } else newAddresses.push(a);
    addresses = newAddresses;
  }
  return addresses;
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
      addresses = maskAddress(memAddress);
      for (addr of addresses) memory[toDecimal(addr)] = memVal;
    }
  }
  let res = 0;

  for (const address in memory) {
    res += memory[address];
  }
  console.log(res);
});
