fs = require("fs");
fs.readFile("./data/input_day2a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let nums = data.split("\n");
  let obs = [];
  nums.forEach((row) => {
    [times, letter, pwd] = row.split(" ");
    [lower, upper] = times.split("-");
    obs.push({
      lower: lower,
      upper: upper,
      pwd: pwd,
      letter: letter.charAt(0),
    });
  });
  let res = obs.filter(
    (obj) =>
      (obj.pwd.charAt(obj.lower - 1) === obj.letter) ^
      (obj.pwd.charAt(obj.upper - 1) === obj.letter)
  );
  console.log(res.length);
});
