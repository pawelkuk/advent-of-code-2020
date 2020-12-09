fs = require("fs");
fs.readFile("./data/input_day1.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else {
    let nums = data.split("\n").map((n) => Number(n));
    for (let i = 0; i < nums.length; i++)
      for (let j = i; j < nums.length; j++) {
        if (i == j) continue;
        if (nums[i] + nums[j] == 2020)
          console.log(i, nums[i], j, nums[j], nums[i] * nums[j]);
      }
  }
});
