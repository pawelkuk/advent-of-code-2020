fs = require("fs");

fs.readFile("./data/input_day15.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let arr = data.split(",");
  state = {};
  for (i = 0; i < arr.length; i++) {
    state[arr[i]] = [i];
  }
  [lastSpoken] = arr.slice(-1);
  for (turn = arr.length; turn < 30000000; turn++) {
    // console.log(state);
    whenLastSpoken = state[lastSpoken].slice(-2);
    // console.log(
    //   lastSpoken,
    //   "was last spoken in turn",
    //   whenLastSpoken,
    //   `(turn ${turn}}`
    // );
    if (whenLastSpoken.length === 1) {
      newSpoken = 0;
      // console.log(
      //   lastSpoken,
      //   "was spoken for the first time, therefore newSpoken",
      //   0
      // );
    } else {
      age = whenLastSpoken[1] - whenLastSpoken[0];
      newSpoken = age;
      // console.log("therefore the age is", age);
    }
    if (!state.hasOwnProperty(newSpoken)) state[newSpoken] = [];
    state[newSpoken].push(turn);
    lastSpoken = newSpoken;
    // console.log(lastSpoken);
  }
  console.log(lastSpoken);
});
