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
  let reducedRules = reduceRules(rules);
  console.log(reducedRules);
  tickets = tickets.slice(1);
  console.log(tickets.length);
  tickets = tickets.filter((ticket) => {
    for (n of ticket) {
      if (
        !(
          (reducedRules.firstRange[0] <= n &&
            n <= reducedRules.firstRange[1]) ||
          (reducedRules.secondRange[0] <= n && n <= reducedRules.secondRange[1])
        )
      ) {
        return false;
      }
    }
    return true;
  });
  console.log(tickets.length);

  let isValid = [];
  for (let i = 0; i < rules.length; i++) {
    isValid[i] = [];
    for (let j = 0; j < rules.length; j++) {
      isValid[i][j] = true;
    }
  }
  for (let i = 0; i < rules.length; i++)
    for (let j = 0; j < rules.length; j++) {
      for (ticket of tickets) {
        if (
          !(
            (rules[i].firstRange[0] <= ticket[j] &&
              ticket[j] <= rules[i].firstRange[1]) ||
            (rules[i].secondRange[0] <= ticket[j] &&
              ticket[j] <= rules[i].secondRange[1])
          )
        ) {
          isValid[i][j] = false;
          break;
        }
      }
    }
  console.log(isValid.map((el) => el.reduce((a, b) => a + b, 0)));
});
