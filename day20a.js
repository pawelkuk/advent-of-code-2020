const { get } = require("http");

fs = require("fs");
const tileSize = 10;

function cmp(t1, t2) {
  // console.log(t1, t2);
  for (conf of getAllConfigurations(t2))
    for (rot of getAllRotations(t1))
      if (conf === rot) {
        // console.log("matched\n", t1.join("\n"), "\n\n", t2.join("\n"), "\n");
        // console.log(conf, rot);
        return true;
      }
  return false;
}
function getAllConfigurations(tile) {
  const res = getAllRotations(tile);
  for (let i = 0; i < 4; i++) {
    let reversed = res[i].split("").reverse().join("");
    res.push(reversed);
  }
  return res;
}
function getAllRotations(tile) {
  const res = [];
  // no rotation
  res.push(tile[0]);
  // console.log(res);

  // 90 deg clockwise rotation
  let tmp = [];
  for (let i = tileSize - 1; i >= 0; i--) tmp.push(tile[i][0]);
  res.push(tmp.join(""));
  // console.log(res);

  // 180 deg clockwise rotation
  let reversed = tile[tileSize - 1].split("").reverse().join("");
  res.push(reversed);
  // console.log(res);

  // 270 deg clockwise (90 deg anticlockwise)
  tmp = [];
  for (let i = 0; i < tileSize; i++) tmp.push(tile[i][tileSize - 1]);
  res.push(tmp.join(""));
  // console.log(res);

  return res;
}
fs.readFile("./data/input_day20.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  data = data.split("\n\n");
  tiles = data.map((d) => {
    [id, ...tile] = d.split("\n");
    id = id.match(/(?<=Tile\s)[0-9]+/)[0];
    tile = tile.flat();
    return { id: Number(id), tile };
  });

  // console.log(tiles[0].tile.join("\n"));
  // console.log(tiles[0].tile);

  let cmpMatrix = [];
  for (let i = 0; i < tiles.length; i++) {
    cmpMatrix.push([]);
    for (let j = 0; j < tiles.length; j++) {
      cmpMatrix[i].push([]);
    }
  }
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j <= i; j++) {
      if (i === j) {
        cmpMatrix[i][j] = false;
        continue;
      }
      res = cmp(tiles[i].tile, tiles[j].tile);
      cmpMatrix[i][j] = res;
      cmpMatrix[j][i] = res;
    }
  }

  // console.log(cmpMatrix);
  // console.log(tmp);
  // console.log(tmp.map((el) => el.join("")).join("\n"));
  let sums = cmpMatrix.map((el) => el.reduce((a, b) => a + b, 0));
  console.log(sums);
  let finalRes = 1;
  for (let i = 0; i < sums.length; i++) {
    if (sums[i] === 2) finalRes *= tiles[i].id;
  }
  console.log(finalRes);
});
