fs = require("fs");
fs.readFile("./data/input_day5a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let numsBin = data
    .replace(/F/g, "0")
    .replace(/B/g, "1")
    .replace(/R/g, "1")
    .replace(/L/g, "0")
    .split("\n");
  nums = numsBin.map((n) => parseInt(n, 2));
  nums = nums.sort((a, b) => (a > b ? 1 : -1));
  for (let i = 1; i < nums.length; i++)
    if (nums[i] - nums[i - 1] !== 1) console.log((nums[i - 1] + nums[i]) / 2);
});
