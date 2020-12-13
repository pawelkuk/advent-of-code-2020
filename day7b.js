fs = require("fs");
fs.readFile("./data/input_day7a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let rules = [];
  for (row of rows) {
    let outerBagColor = row.match(/^.*?(?=\s+bags)/gs)[0];
    let inner = row.match(/[0-9]+\s+.*?(?=\s+bag)/gs);
    if (inner)
      rules.push([
        inner.map((bag) => [Number(bag.slice(0, 1)), bag.slice(2)]),
        outerBagColor,
      ]);
  }
  let adjList = {};
  for ([inners, outer] of rules) {
    for ([n, inner] of inners) {
      if (adjList.hasOwnProperty(outer)) {
        if (!adjList[outer].includes({ inner: inner, n: n }))
          adjList[outer].push({ inner: inner, n: n });
      } else adjList[outer] = [{ inner: inner, n: n }];
    }
  }
  let toVisit = [{ inner: "shiny gold", n: 1 }];
  let res = -1;
  while (toVisit.length !== 0) {
    let currVisited = toVisit.shift();
    res += currVisited.n;
    if (!adjList.hasOwnProperty(currVisited.inner)) continue;
    let newToVisit = adjList[currVisited.inner];
    newToVisit = newToVisit.map(({ inner, n }) => {
      return { inner: inner, n: n * currVisited.n };
    });
    toVisit.push(...newToVisit);
  }
  console.log(res);
});
