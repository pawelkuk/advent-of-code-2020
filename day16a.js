fs = require("fs");
function extractRules(rules) {
  rules = rules.split("\n");
  rules = rules.map((rule) => {
    return {
      field: rule.match(/^[a-z\s]+/g)[0],
      firstRange: rule.match(/(?<=:\s)[0-9-]+/g)[0],
      secondRange: rule.match(/(?<=or\s)[0-9-]+$/g)[0],
    };
  });
  rules = rules.map(({ field, firstRange, secondRange }) => {
    firstRange = firstRange.split("-").map((n) => Number(n));
    secondRange = secondRange.split("-").map((n) => Number(n));
    return {
      field: field,
      firstRange: firstRange,
      secondRange: secondRange,
    };
  });
  return rules;
}

function reduceRules(rules) {
  firstRanges = rules.map((rule) => rule.firstRange);
  secondRanges = rules.map((rule) => rule.secondRange);
  [firstMin, firstMax] = [
    Math.min(...firstRanges.map((n) => n[0])),
    Math.max(...firstRanges.map((n) => n[1])),
  ];
  [secondMin, secondMax] = [
    Math.min(...secondRanges.map((n) => n[0])),
    Math.max(...secondRanges.map((n) => n[1])),
  ];
  return {
    firstRange: [firstMin, firstMax],
    secondRange: [secondMin, secondMax],
  };
}

fs.readFile("./data/input_day16.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  [rules, myTicket, otherTickets] = data.split("\n\n");
  rules = extractRules(rules);
  let tickets = otherTickets
    .split("\n")
    .map((ticket) => ticket.split(",").map((n) => Number(n)));
  rules = reduceRules(rules);
  let res = 0;
  tickets = tickets.slice(1);
  for (ticket of tickets)
    for (n of ticket) {
      isValid = false;
      for (prop in rules) {
        [min, max] = rules[prop];
        if (min <= n && n <= max) {
          isValid = true;
        }
      }
      if (!isValid) {
        res += n;
      }
    }
  console.log(res);
});
