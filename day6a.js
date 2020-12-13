fs = require("fs");
fs.readFile("./data/input_day6a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let ans = [];
  let tmp = [];
  rows.forEach((row) => {
    if (row === "") {
      ans.push(tmp.join(""));
      tmp = [];
    } else {
      tmp.push(row);
    }
  });
  let letters = [];
  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode("a".charCodeAt(0) + i));
  }
  let cnt = 0;
  let res = 0;
  for (row of ans) {
    cnt = 0;
    for (letter of letters) if (row.match(letter)) cnt++;
    res += cnt;
  }
  console.log(res);
});
