const eyeColors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
const fields = ["byr", "iyr", "eyr", "hgt", "ecl", "hcl", "pid"];

validation = {
  byr: (n) => 1920 <= n && n <= 2002,
  iyr: (n) => 2010 <= n && n <= 2020,
  eyr: (n) => 2020 <= n && n <= 2030,
  hgt: (hgt) => {
    if (hgt.includes("cm")) {
      hgt = Number(hgt.replace("cm", ""));
      return 150 <= hgt && hgt <= 193;
    } else if (hgt.includes("in")) {
      hgt = Number(hgt.replace("in", ""));
      return 59 <= hgt && hgt <= 76;
    } else return false;
  },
  hcl: (hcl) => !!hcl.match(/^#[0-9a-f]{6}$/),
  ecl: (ecl) => eyeColors.includes(ecl),
  pid: (pid) => !!pid.match(/^[0-9]{9}$/),
};

fs = require("fs");
fs.readFile("./data/input_day4a.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n");
  let passports = [];
  let tmp = [];
  rows.forEach((row) => {
    if (row === "") {
      passports.push(tmp.join(" "));
      tmp = [];
    } else {
      tmp.push(row);
    }
  });
  passports = passports.map((row) => {
    return Object.fromEntries(row.split(" ").map((kv) => kv.split(":")));
  });
  for (p of passports) {
    p.byr = Number(p.byr);
    p.iyr = Number(p.iyr);
    p.eyr = Number(p.eyr);
  }
  let cnt = 0;
  let valid = true;
  passports.forEach((passport) => {
    valid = true;
    for (field of fields) {
      if (
        !passport.hasOwnProperty(field) ||
        !validation[field](passport[field])
      ) {
        valid = false;
        break;
      }
    }
    cnt += valid;
  });
  console.log(cnt);
});
