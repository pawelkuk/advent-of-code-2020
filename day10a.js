fs = require("fs");
fs.readFile("./data/input_day10.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let diff = { 1: 0, 3: 0 };
  let nums = data
    .split("\n")
    .map((n) => Number(n))
    .sort((a, b) => (a > b ? 1 : -1));
  for (let i = 1; i < nums.length; i++) diff[nums[i] - nums[i - 1]]++;
  console.log(diff[1] * (diff[3] + 1));
});
