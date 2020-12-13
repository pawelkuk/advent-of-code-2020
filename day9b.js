fs = require("fs");
fs.readFile("./data/input_day9.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let nums = data.split("\n").map((n) => Number(n));
  let invalidN = 0;
  for (let i = 25; i < nums.length; i++) {
    let valid = false;
    let preamble = nums.slice(i - 25, i);
    let n = nums[i];
    for (j of preamble)
      for (k of preamble) if (j !== k && j + k === n) valid = true;
    if (!valid) {
      invalidN = n;
      break;
    }
  }
  for (let i = 2; i < nums.length; i++) {
    for (let j = 0; j + i < nums.length; j++) {
      if (nums.slice(j, j + i).reduce((a, b) => a + b, 0) === invalidN)
        console.log(
          Math.max(...nums.slice(j, j + i)) + Math.min(...nums.slice(j, j + i))
        );
    }
  }
});
