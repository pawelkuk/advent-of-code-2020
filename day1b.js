fs = require("fs");
fs.readFile("./data/input_day1b.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  else {
    let nums = data.split("\n").map((n) => Number(n));
    for (let i = 0; i < nums.length; i++)
      for (let j = i; j < nums.length; j++)
        for (let k = j; k < nums.length; k++) {
          if (nums[i] + nums[j] + nums[k] == 2020)
            console.log(
              i,
              nums[i],
              j,
              nums[j],
              k,
              nums[k],
              nums[i] * nums[j] * nums[k]
            );
        }
  }
});
