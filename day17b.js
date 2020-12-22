fs = require("fs");
const updateState = (state) => {
  const newState = new Map();
  for (const [position, [status, cnt]] of state) {
    if (status === ACTIVE && (cnt === 2 || cnt === 3))
      newState.set(position, [ACTIVE, 0]);
    else if (status === ACTIVE) newState.set(position, [INACTIVE, 0]);
    else if (status === INACTIVE && cnt === 3)
      newState.set(position, [ACTIVE, 0]);
    else newState.set(position, [INACTIVE, 0]);
  }
  return newState;
};
const genNeighbors = ([x, y, z, w]) => {
  const dirs = [-1, 0, 1];
  const neighbors = [];
  for (dx of dirs)
    for (dy of dirs)
      for (dz of dirs)
        for (dw of dirs) {
          const neighborCandidate = [x + dx, y + dy, z + dz, w + dw];
          if (dx != 0 || dy != 0 || dz !== 0 || dw !== 0)
            neighbors.push(neighborCandidate);
        }
  return neighbors;
};
const updateActiveNeighborCount = (state) => {
  const newState = new Map();
  const newFields = [];
  for ([pos, [currValStatus]] of state) {
    pos = pos.split(",").map((n) => Number(n));
    let currPosCnt = 0;
    for (neighborPosition of genNeighbors(pos)) {
      debugger;
      // console.log(state.has(neighborPosition.toString()), neighborPosition);
      if (state.has(neighborPosition.toString())) {
        const [status, counter] = state.get(neighborPosition.toString());
        if (status === ACTIVE) currPosCnt += 1;
      } else {
        newFields.push(neighborPosition);
      }
    }
    newState.set(pos.toString(), [currValStatus, currPosCnt]);
  }
  for (position of newFields) {
    let currPosCnt = 0;
    for (neighborPosition of genNeighbors(position))
      if (state.has(neighborPosition.toString())) {
        const [status, counter] = state.get(neighborPosition.toString());
        if (status === ACTIVE) currPosCnt += 1;
      }
    newState.set(position.toString(), [INACTIVE, currPosCnt]);
  }
  return newState;
};
const ACTIVE = "#";
const INACTIVE = ".";
fs.readFile("./data/input_day17.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let rows = data.split("\n").map((row) => Array.from(row));
  let z = 0;
  let w = 0;
  let state = new Map();
  rows.forEach((arr, x) =>
    arr.forEach((el, y) => {
      state.set([x, y, z, w].toString(), [el, 0]);
    })
  );
  for (let i = 0; i < 6; i++) {
    state = updateActiveNeighborCount(state);
    state = updateState(state);
  }
  let res = 0;
  for (const [, [status]] of state) res += !!(status === ACTIVE);
  console.log(res);
});
