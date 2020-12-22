fs = require("fs");
fs.readFile("./data/input_day17.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n").map((row) => Array.from(row));
  console.log(rows);
});
