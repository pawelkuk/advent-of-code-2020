const { count, debug } = require("console");

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
  fields = ["byr", "iyr", "eyr", "hgt", "ecl", "hcl", "pid"].map(
    (el) => el + ":"
  );
  console.log(fields);
  let cnt = 0;
  let valid = true;
  passports.forEach((passport) => {
    valid = true;
    let passportFields = passport.matchAll(/[a-zA-Z]{3}:/g);
    passportFields = Array.from(passportFields).map((el) => el[0]);
    for (field of fields) if (!passportFields.includes(field)) valid = false;
    cnt += valid;
  });
  console.log(cnt);
});
