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
  console.log(Math.max(...nums));
});
