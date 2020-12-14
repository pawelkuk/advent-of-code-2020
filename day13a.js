fs = require("fs");

fs.readFile("./data/input_day13.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let [t0, schedule] = data.split("\n");
  t0 = Number(t0);
  schedule = schedule
    .split(",")
    .filter((el) => !!(el !== "x"))
    .map((el) => Number(el));
  let foundAnswer = false;
  for (let i = t0; i < Math.min(...schedule) + t0; i++) {
    for (bus of schedule) {
      if (i % bus === 0) {
        console.log((i - t0) * bus);
        foundAnswer = true;
        break;
      }
    }
    if (foundAnswer) break;
  }
});
