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
  for (let i = 0; i < lines.length; i++) {
    if (lines[i][0] === "acc") continue;
    if (lines[i][0] === "nop") lines[i][0] = "jmp";
    else if (lines[i][0] === "jmp") lines[i][0] = "nop";

    let currLine = 0;
    let executedLines = [];
    accumulator = 0;
    while (!executedLines.includes(currLine)) {
      if (currLine >= lines.length) {
        console.log(accumulator);
        break;
      }
      executedLines.push(currLine);
      [opcode, args] = lines[currLine];
      currLine = proc[opcode](currLine, ...args);
    }
    if (lines[i][0] === "nop") lines[i][0] = "jmp";
    else if (lines[i][0] === "jmp") lines[i][0] = "nop";
  }
});
