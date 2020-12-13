fs = require("fs");
let accumulator = 0;
let proc = {
  acc: (line, val) => {
    accumulator += val;
    return line + 1;
  },
  jmp: (line, offset) => line + offset,
  nop: (line, arg) => line + 1,
};
fs.readFile("./data/input_day8a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let lines = data.split("\n");
  lines = lines.map((line) => {
    const splittedLine = line.split(" ");
    return [splittedLine[0], splittedLine.slice(1).map((n) => Number(n))];
  });
  let currLine = 0;
  let executedLines = [];
  while (!executedLines.includes(currLine)) {
    executedLines.push(currLine);
    [opcode, args] = lines[currLine];
    currLine = proc[opcode](currLine, ...args);
  }
  console.log(accumulator);
});
