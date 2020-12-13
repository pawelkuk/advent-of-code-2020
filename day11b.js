fs = require("fs");
fs.readFile("./data/input_day11.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  let currBoard = data.split("\n").map((row) => Array.from(row));
  dirs = [
    [1, 1],
    [1, 0],
    [1, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [0, -1],
  ];
  let nOfChanges = -1;
  while (nOfChanges != 0) {
    nOfChanges = 0;
    newBoard = [...currBoard.map((row) => [...row])];
    for (let i = 0; i < currBoard.length; i++)
      for (let j = 0; j < currBoard[0].length; j++) {
        if (currBoard[i][j] === ".") continue;
        if (currBoard[i][j] === "L") {
          let nOfTakenAdj = 0;
          for ([dx, dy] of dirs) {
            let incr = 1;
            while (true) {
              if (
                !(
                  0 <= i + incr * dx &&
                  i + incr * dx < currBoard.length &&
                  0 <= j + incr * dy &&
                  j + incr * dy < currBoard[0].length
                )
              )
                break;
              if (currBoard[i + incr * dx][j + incr * dy] === "L") break;
              if (currBoard[i + incr * dx][j + incr * dy] === ".") {
                incr++;
                continue;
              }
              if (currBoard[i + incr * dx][j + incr * dy] === "#") {
                nOfTakenAdj++;
                break;
              }
            }
          }
          if (nOfTakenAdj === 0) {
            newBoard[i][j] = "#";
            nOfChanges++;
          }
        }
        if (currBoard[i][j] === "#") {
          let nOfTakenAdj = 0;
          for ([dx, dy] of dirs) {
            let incr = 1;
            while (true) {
              if (
                !(
                  0 <= i + incr * dx &&
                  i + incr * dx < currBoard.length &&
                  0 <= j + incr * dy &&
                  j + incr * dy < currBoard[0].length
                )
              )
                break;
              if (currBoard[i + incr * dx][j + incr * dy] === "L") break;
              if (currBoard[i + incr * dx][j + incr * dy] === ".") {
                incr++;
                continue;
              }
              if (currBoard[i + incr * dx][j + incr * dy] === "#") {
                nOfTakenAdj++;
                break;
              }
            }
          }
          if (nOfTakenAdj >= 5) {
            newBoard[i][j] = "L";
            nOfChanges++;
          }
        }
      }
    currBoard = newBoard;
  }
  let nOfOccupied = 0;
  for (let i = 0; i < currBoard.length; i++)
    for (let j = 0; j < currBoard[0].length; j++) {
      if (currBoard[i][j] === "#") nOfOccupied++;
    }
  console.log(nOfOccupied);
});
