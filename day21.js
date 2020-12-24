fs = require("fs");
fs.readFile("./data/input_day21.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let ingr = data
    .split("\r\n")
    .map((row) => row.match(/^[a-z\s]+[a-z]/gs)[0].split(" "));
  let alle = data
    .split("\n")
    .map((row) =>
      row.match(/(?<=\(contains\s)[a-z,\s]+(?=\))/gs)[0].split(", ")
    );

  let allIngr = new Map();
  let allAlle = new Map();
  for (line of ingr)
    for (i of line)
      if (!allIngr.has(i)) allIngr.set(i, 1);
      else allIngr.set(i, allIngr.get(i) + 1);
  for (line of alle) for (i of line) allAlle.set(i, true);

  let not = new Map();
  for (i of allIngr.keys()) {
    not.set(i, []);
  }
  for (let i = 0; i < ingr.length; i++) {
    for (ingradiant of allIngr.keys())
      if (!ingr[i].includes(ingradiant)) {
        let tmp = not.get(ingradiant);
        for (a of alle[i]) {
          if (!tmp.includes(a)) tmp.push(a);
        }
        not.set(ingradiant, tmp);
      }
  }
  console.log(allAlle);
  let nOfAllAllergens = allAlle.size;
  let res = 0;
  for (let ingradiant of not.keys()) {
    if (not.get(ingradiant).length === nOfAllAllergens)
      res += allIngr.get(ingradiant);
    else {
      let tmp = [...allAlle.keys()].filter(
        (el) => !not.get(ingradiant).includes(el)
      );
      console.log(ingradiant, tmp);
    }
  }
  console.log(res);
});
