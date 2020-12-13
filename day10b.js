fs = require("fs");
fs.readFile("./data/input_day10.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let nums = data
    .split("\n")
    .map((n) => Number(n))
    .sort((a, b) => (a > b ? 1 : -1));
  nums = [0, ...nums, Math.max(nums) + 3];
  let streak = 1;
  let diff = 1;
  let res = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] === diff) streak++;
    else {
      console.log(streak, diff);
      if (diff === 1) {
        if (streak === 4) res *= 4;
        if (streak === 3) res *= 2;
        if (streak === 5) res *= 7;
      }
      diff = nums[i] - nums[i - 1];
      streak = 2;
    }
  }
  console.log(res);
});
