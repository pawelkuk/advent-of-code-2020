fs = require("fs");
const operations = {
  "+": (a, b) => a + b,
  "*": (a, b) => a * b,
};
function insertRight(row, idx) {
  if (!!row[idx + 1].match(/[0-9]/))
    return row.slice(0, idx + 2) + ")" + row.slice(idx + 2);
  else if (!!row[idx + 1].match(/\(/)) {
    let balance = 0;
    for (let i = idx + 1; idx < row.length; i++) {
      if (row[i] === "(") balance += 1;
      else if (row[i] === ")") balance -= 1;
      if (balance === 0) return row.slice(0, i + 1) + ")" + row.slice(i + 1);
    }
  } else throw "error";
}
function insertLeft(row, idx) {
  if (!!row[idx - 1].match(/[0-9]/))
    return row.slice(0, idx - 1) + "(" + row.slice(idx - 1);
  else if (!!row[idx - 1].match(/\)/)) {
    let balance = 0;
    for (let i = idx - 1; idx >= 0; i--) {
      if (row[i] === "(") balance += 1;
      else if (row[i] === ")") balance -= 1;
      if (balance === 0) return row.slice(0, i + 1) + "(" + row.slice(i + 1);
    }
  } else throw "error";
}
const addBracketsAroundPlusOperation = (row, i) => {
  let cnt = 0;
  let searchedPlus = 0;
  Array.from(row).forEach((c, idx) => {
    if (c === "+") {
      cnt += 1;
      if (cnt == i) {
        searchedPlus = idx;
      }
    }
  });
  row = insertRight(row, searchedPlus);
  row = insertLeft(row, searchedPlus);
  return row;
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
      let op = opStack.pop();
      partialResult = operations[op](...vals);
      stack.push([partialResult]);
    }
  }
  return stack[0][0];
};

fs.readFile("./data/input_day18.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n").map((row) => row.replace(/\s/g, ""));
  const obs = rows.map((row) => [row, row.split("+").length - 1]);
  let res = 0;
  newRows = [];
  for (let [row, nOfPluses] of obs) {
    for (let i = 1; i <= nOfPluses; i++) {
      row = addBracketsAroundPlusOperation(row, i);
    }
    newRows.push(row);
  }
  for (let instructions of newRows) {
    res += calcExpr(instructions);
  }
  console.log(res);
});
