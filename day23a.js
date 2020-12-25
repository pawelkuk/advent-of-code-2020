const { match } = require("assert");

fs = require("fs");
function takeThreeNext(curr, nums) {
  nums = [...nums];
  if (curr + 3 < nums.length) return [nums.splice(curr + 1, 3), nums];
  if (curr + 1 === nums.length) return [nums.splice(0, 3), nums];
  if (curr + 2 === nums.length) {
    let res = nums.splice(-1, 1);
    res.push(...nums.splice(0, 2));
    return [res, nums];
  }
  if (curr + 3 === nums.length) {
    let res = nums.splice(-2, 2);
    res.push(...nums.splice(0, 1));
    return [res, nums];
  }
}

function calcDestinationIndex(currLabel, nums) {
  let destinationIdx = -1;
  while (true) {
    if (destinationIdx !== -1) break;
    currLabel = currLabel > 0 ? currLabel - 1 : Math.max(...nums);
    destinationIdx = nums.indexOf(currLabel);
  }
  return destinationIdx;
}
fs.readFile("./data/input_day23.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let nums = Array.from(data).map((n) => Number(n));
  // console.log(nums);
  let currIdx = 0;
  let threeAdjacent = [];
  for (let round = 0; round < 100; round++) {
    console.log("curr nums:", nums);
    let currLabel = nums[currIdx];
    console.log("curr Label:", currLabel, "at index", currIdx);

    [threeAdjacent, nums] = takeThreeNext(currIdx, nums);
    console.log("next three", threeAdjacent, "rest", nums);
    let destinationIdx = calcDestinationIndex(currLabel, nums);
    console.log("DestIdx", destinationIdx);
    nums = nums
      .slice(0, destinationIdx + 1)
      .concat(threeAdjacent)
      .concat(nums.slice(destinationIdx + 1));
    currIdx = (nums.indexOf(currLabel) + 1) % nums.length;
  }
  console.log(nums.join(""));
});
