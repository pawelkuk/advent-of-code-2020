const dp1 = new Map();
const dp2 = new Map();

const matchRest = (line, rules) => {
  if (line.length === 0 && rules.length === 0) return true;
  if (line.length === 0) return false;
  if (rules.length === 0) return false;
  let res = false;
  let key = line + " " + rules.toString();
  if (dp2.has(key)) return dp2.get(key);

  for (let i = 0; i <= line.length; i++) {
    if (
      match(line.slice(0, i), rules[0]) &&
      matchRest(line.slice(i), rules.slice(1))
    ) {
      res = true;
    }
  }
  dp2.set(key, res);
  return res;
};

const match = (line, rule) => {
  let key = line + " " + rule.toString();
  let res = false;

  if (dp1.has(key)) return dp1.get(key);
  debugger;
  if (rule === "a" || rule === "b") {
    res = line === rule;
  } else {
    let rules = rulesObj[rule];
    for (opt of rules)
      for (let i = 0; i < line.length; i++) {
        if (matchRest(line, opt)) res = true;
      }
  }
  dp1.set(key, res);
  return res;
};

fs = require("fs");
const rulesObj = {};
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
  let res = 0;
  for (m of messages) {
    res += match(m, 0);
    console.log("match", res);
  }
  console.log(res);
});
