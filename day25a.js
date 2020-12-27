fs = require("fs");

function transformSubjectNumber(loopSize, subjNum = 7) {
  let res = 1;
  for (let i = 0; i < loopSize; i++) {
    res = (res * subjNum) % 20201227;
  }
  return res;
}

function calcLoopSize(pubKey, subjNum = 7) {
  let loopSize = 0;
  let n = 1;
  while (true) {
    if (pubKey === n) break;
    n = (n * subjNum) % 20201227;
    loopSize++;
  }
  return loopSize;
}

fs.readFile("./data/input_day25.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let [pk1, pk2] = data.split("\n").map((n) => Number(n));
  console.log(pk1, pk2);
  let [ls1, ls2] = [calcLoopSize(pk1), calcLoopSize(pk2)];
  console.log(ls1, ls2);
  let ek1 = transformSubjectNumber(ls1, pk2);
  let ek2 = transformSubjectNumber(ls2, pk1);
  console.log(ek1, ek2);
});
