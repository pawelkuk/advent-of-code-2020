fs = require("fs");

function crt(num, rem) {
  let sum = 0;
  const prod = num.reduce((a, c) => a * c, 1);

  for (let i = 0; i < num.length; i++) {
    const [ni, ri] = [num[i], rem[i]];
    const p = Math.floor(prod / ni);
    sum += ri * p * mulInv(p, ni);
  }
  return [sum, prod - (sum % prod)];
}

function mulInv(a, b) {
  const b0 = b;
  let [x0, x1] = [0, 1];

  if (b === 1) {
    return 1;
  }
  while (a > 1) {
    const q = Math.floor(a / b);
    [a, b] = [b, a % b];
    [x0, x1] = [x1 - q * x0, x0];
  }
  if (x1 < 0) {
    x1 += b0;
  }
  return x1;
}

fs.readFile("./data/input_day13.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let [t0, schedule] = data.split("\n");
  schedule = schedule
    .split(",")
    .map((el, idx) => [idx, el])
    .filter((el) => !!(el[1] !== "x"))
    .map(([idx, el]) => [idx, Number(el)]);
  num = schedule.map(([rem, num]) => num);
  rem = schedule.map(([rem, num]) => rem);

  let [tmp, res] = crt(num, rem);
  res = res - 23;
  console.log(res);
});
