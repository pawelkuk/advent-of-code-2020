fs = require("fs");
fs.readFile("./data/input_day3a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let j = 0;
  let counter = 0;
  let rlen = rows[0].length;
  for (let i = 0; i < rows.length; i++) {
    if (rows[i][j % rlen] === "#") counter++;
    j += 3;
  }
  console.log(counter);
});
