const { type } = require("os");

fs = require("fs");
const rulesObj = {};

const isValid = () => {
  let currPatterns = JSON.parse(JSON.stringify(rulesObj[0]));
  let tmpcnt = 0;
  while (true) {
    currPatterns.forEach((currPattern, j) => {
      currPattern.forEach((el, i) => {
        if (typeof el === "number") {
          currPattern[i] = JSON.parse(JSON.stringify(rulesObj[currPattern[i]]));
        }
      });
    });

    newPatterns = currPatterns;
    while (true) {
      let p = newPatterns.shift();
      let found = false;
      p.forEach((el, idx) => {
        if (!found && typeof el === "object" && typeof el[0] === "object") {
          newPatterns.push(
            p.slice(0, idx).concat([p[idx][0]], p.slice(idx + 1))
          );
          if (p[idx].length === 2)
            newPatterns.push(
              p.slice(0, idx).concat([p[idx][1]], p.slice(idx + 1))
            );
          found = true;
        }
      });

      if (!found) {
        newPatterns.push(p);
        newPatterns = newPatterns.map((el) => el.flat());
        break;
      }
    }
    currPatterns = newPatterns;

    if (
      currPatterns.every((ell) => ell.every((el) => typeof el === "string"))
    ) {
      break;
    }

    tmpcnt += 1;
    console.log("loop", tmpcnt);
  }
  return currPatterns.map((el) => el.join(""));
};

fs.readFile("./data/input_day19.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let [rules, messages] = data.split("\r\n\r\n");
  rules = rules.split("\r\n").map((rule) => {
    let [n, r] = rule.split(": ");
    let character = r.match(/(?<=")[a-z](?=")/);
    if (!!character) {
      return [Number(n), character[0]];
    } else {
      r = r.split(" | ").map((xi) => xi.split(" ").map((phi) => Number(phi)));
      return [Number(n), r];
    }
  });
  rules.forEach(([n, r]) => {
    rulesObj[n] = r;
  });
  messages = messages.split("\r\n");
  console.log(rulesObj);
  patterns = isValid();
  let res = 0;
  for (m of messages) {
    res += patterns.includes(m);
  }
  console.log(res);
});
