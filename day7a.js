fs = require("fs");
fs.readFile("./data/input_day7a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let rules = [];
  for (row of rows) {
    let outerBagColor = row.match(/^.*?(?=\s+bags)/gs);
    let innerBagsColors = row.match(/(?<=[0-9]+\s+).*?(?=\s+bag)/gs);
    if (innerBagsColors) rules.push([innerBagsColors, outerBagColor]);
  }
  adjList = {};
  for ([inners, [outer]] of rules) {
    for (inner of inners) {
      if (adjList.hasOwnProperty(inner)) {
        if (!adjList[inner].includes(outer)) adjList[inner].push(outer);
      } else adjList[inner] = [outer];
    }
  }
  console.log(adjList["shiny gold"]);
  let toVisit = ["shiny gold"];
  let allMarked = [];
  while (toVisit.length !== 0) {
    let currVisited = toVisit.pop();
    if (!adjList.hasOwnProperty(currVisited)) {
      console.log(currVisited);
      continue;
    }
    let newToVisit = adjList[currVisited].filter(
      (el) => !allMarked.includes(el)
    );
    toVisit.push(...newToVisit);
    allMarked.push(...newToVisit);
  }
  console.log(allMarked.length);
});
