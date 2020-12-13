fs = require("fs");

const getLetters = () => {
  let letters = [];
  for (let i = 0; i < 26; i++) {
    letters.push(String.fromCharCode("a".charCodeAt(0) + i));
  }
  return letters;
};
fs.readFile("./data/input_day6a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let ans = [];
  let tmp = [];
  rows.forEach((row) => {
    if (row === "") {
      ans.push(tmp);
      tmp = [];
    } else {
      tmp.push(row);
    }
  });
  let letters = getLetters();

  let res = 0;
  for (group of ans) {
    let filteredArray = letters;
    for (row of group)
      filteredArray = Array.from(row).filter((value) =>
        filteredArray.includes(value)
      );
    res += filteredArray.length;
  }
  console.log(res);
});
