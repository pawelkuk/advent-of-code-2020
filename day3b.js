const { count } = require("console");

fs = require("fs");
fs.readFile("./data/input_day3a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let j = 0;
  let rlen = rows[0].length;
  let res = 1;
  let dirs = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  dirs.forEach(([right, down]) => {
    let j = 0;
    let counter = 0;
    for (let i = 0; i < rows.length; i += down) {
      if (rows[i][j % rlen] === "#") counter++;
      j += right;
    }
    console.log(counter);
    res *= counter;
  });
  console.log(res);
});
