fs = require("fs");
const operations = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
};

const calcExpr = (instructions, res = 0) => {
  const stack = [[]];
  const opStack = [];
  for (next of instructions) {
    if (["(", ")", "+", "*"].includes(next)) {
      if (next === "+") opStack.push("+");
      if (next === "*") opStack.push("*");
      if (next === "(") stack.push([]);
      if (next === ")") {
        let [val] = stack.pop();
        stack.slice(-1)[0].push(val);
      }
    } else {
      let nums = stack.pop();
      nums.push(Number(next));
      stack.push(nums);
    }
    while (stack.slice(-1)[0].length === 2) {
      let vals = stack.pop();
      debugger;
      let op = opStack.pop();
      partialResult = operations[op](...vals);
      stack.push([partialResult]);
    }
  }
  return stack[0][0];
};

fs.readFile("./data/input_day18.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n").map((row) => Array.from(row.replace(/\s/g, "")));
  let res = 0;
  for (let instructions of rows) {
    res += calcExpr(instructions);
  }
  console.log(res);
});
