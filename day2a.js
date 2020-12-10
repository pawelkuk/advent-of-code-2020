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
  obs = obs.map((obj) => {
    let re = new RegExp(obj.letter, "g");
    let n = obj.pwd.match(re);
    n = n ? n.length : 0;
    obj.n = n;
    return obj;
  });
  let res = obs.filter((obj) => obj.lower <= obj.n && obj.n <= obj.upper);
  console.log(res.length);
});
