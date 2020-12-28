fs = require("fs");
const tileSize = 10;

function match(t1, t2, side) {
  let row = null;
  if (side === "right")
    row = t1
      .map((line) => line[line.length - 1])
      .reverse()
      .join("");
  else if (side === "down") row = t1[t1.length - 1].join("");
  // else if (side === "left") row = t1.map((line) => line[0]).join("");
  // else if (side === "up") row = t1[0].join("");
  side = side === "down" ? "up" : side;
  for (conf of getAllConfigurations(t2, side))
    if (conf.row === row) {
      return conf.orientation;
    }
  return null;
}

const matchSecondTile = (t1, t2) => {
  // console.log(t1, t2);
  // t2 = t2.map((line) => line.join(""));
  let right = match(t1, t2, "right");
  if (!!right) {
    // console.log(`matched right ${right}`, "\n" + t2.join("\n"), "\n");
    let offset = [0, tileSize];
    return [offset, right, "right"];
  }
  let down = match(t1, t2, "down");
  if (!!down) {
    // console.log(`matched down ${down}`, "\n" + t2.join("\n"), "\n");
    let offset = [tileSize, 0];
    return [offset, down, "down"];
  }
  // let left = match(t1, t2, "left");
  // if (!!left) {
  //   console.log(`matched left ${left}`, "\n" + t2.join("\n"), "\n");
  //   let offset = [0, -tileSize];
  //   return [offset, left];
  // }
  // let up = match(t1, t2, "up");
  // if (!!up) {
  //   console.log(`matched up ${up}`, "\n" + t2.join("\n"), "\n");
  //   let offset = [-tileSize, 0];
  //   return [offset, up];
  // }
  console.log("something wrong!!");
};

const extractFromPicture = (position, picture) => {
  const extracted = [];
  for (let i = 0; i < tileSize; i++) {
    extracted.push([]);
  }
  const [x, y] = position;
  for (let i = 0; i < tileSize; i++) {
    for (let j = 0; j < tileSize; j++) {
      extracted[i][j] = picture[x + i][y + j];
    }
  }
  return extracted;
};

function placeRelativeTo(prevPosition, newTile, picture, firstTime = false) {
  let [x, y] = prevPosition;
  if (firstTime) {
    for (let i = 0; i < tileSize; i++) {
      for (let j = 0; j < tileSize; j++) {
        picture[x + i][y + j] = newTile[i][j];
      }
    }
    return [0, 0];
  }
  const prevTile = extractFromPicture(prevPosition, picture);
  const [offset, orientation, side] = matchSecondTile(prevTile, newTile);
  const [dx, dy] = offset;
  const newPosition = [x + dx, y + dy];
  placeAt(newPosition, newTile, orientation, picture, side);
  return newPosition;
}
function moveTo(orientation, tile, side) {
  resTile = [];
  for (let i = 0; i < tileSize; i++) {
    resTile.push([]);
    for (let j = 0; j < tileSize; j++) {
      resTile[i].push(0);
    }
  }
  // console.log(tile.join("\n"), "\n");
  // if (orientation.endsWith("flip")) {
  //   tile = tile.map((line) => Array.from(line).reverse());
  // }
  // console.log(tile.map((el) => el.join("")).join("\n"), "\n");

  if (orientation.startsWith("0")) {
    for (let i = 0; i < tileSize; i++) {
      for (let j = 0; j < tileSize; j++) {
        resTile[i][j] = tile[i][j];
      }
    }
  } else if (orientation.startsWith("270")) {
    for (let i = 0; i < tileSize; i++) {
      for (let j = 0; j < tileSize; j++) {
        resTile[i][j] = tile[j][tileSize - i - 1];
      }
    }
  } else if (orientation.startsWith("180")) {
    for (let i = 0; i < tileSize; i++) {
      for (let j = 0; j < tileSize; j++) {
        resTile[i][j] = tile[tileSize - i - 1][tileSize - j - 1];
      }
    }
  } else if (orientation.startsWith("90")) {
    for (let i = 0; i < tileSize; i++) {
      for (let j = 0; j < tileSize; j++) {
        resTile[i][j] = tile[tileSize - j - 1][i];
      }
    }
  }
  if (orientation.endsWith("flip")) {
    if (side === "right") {
      resTile = resTile.reverse();
      // console.log(side, "flipped");
    } else if (side === "down") {
      resTile = resTile.map((el) => el.reverse());
      // console.log(side, "flipped");
    } else console.log("wrong flip");
  }
  return resTile;
}

function placeAt(position, tile, orientation, picture, side) {
  tile = moveTo(orientation, tile, side);
  let [x, y] = position;
  for (let i = 0; i < tileSize; i++) {
    for (let j = 0; j < tileSize; j++) {
      picture[x + i][y + j] = tile[i][j];
    }
  }
}

function cmp(t1, t2) {
  for (conf of getAllConfigurations(t2))
    for (rot of getAllRotations(t1))
      if (conf.row === rot.row) {
        return {
          match: true,
          orientations: [rot.orientation, conf.orientation],
        };
      }
  return { match: false };
}
function getAllConfigurations(tile, side) {
  const res = getAllRotations(tile, side);
  for (let i = 0; i < 4; i++) {
    let reversed = res[i].row.split("").reverse().join("");
    res.push({ row: reversed, orientation: res[i].orientation + "flip" });
  }
  return res;
}

const side2deg = {
  up: 0,
  right: 270,
  // left: 90,
  down: 180,
};
function getAllRotations(tile, side = "up") {
  const res = [];
  let incr = side2deg[side];
  // console.log(((0 + incr) % 360).toString());
  // no rotation
  res.push({ row: tile[0], orientation: ((0 + incr) % 360).toString() });

  // 90 deg clockwise rotation
  let tmp = [];
  for (let i = tileSize - 1; i >= 0; i--) tmp.push(tile[i][0]);
  res.push({ row: tmp.join(""), orientation: ((90 + incr) % 360).toString() });

  // 180 deg clockwise rotation
  let reversed = tile[tileSize - 1].split("").reverse().join("");
  res.push({ row: reversed, orientation: ((180 + incr) % 360).toString() });

  // 270 deg clockwise (90 deg anticlockwise)
  tmp = [];
  for (let i = 0; i < tileSize; i++) tmp.push(tile[i][tileSize - 1]);
  res.push({ row: tmp.join(""), orientation: ((270 + incr) % 360).toString() });

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

  let cmpMatrix = [];
  for (let i = 0; i < tiles.length; i++) {
    cmpMatrix.push([]);
    for (let j = 0; j < tiles.length; j++) {
      cmpMatrix[i].push([]);
    }
  }
  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles.length; j++) {
      if (i === j) {
        cmpMatrix[i][j] = { match: false };
        continue;
      }
      res = cmp(tiles[i].tile, tiles[j].tile);
      cmpMatrix[i][j] = res;
      // cmpMatrix[j][i] = res;
    }
  }
  let sums = cmpMatrix.map((el) => el.reduce((a, b) => a + b.match, 0));
  let finalRes = 1;
  let root = null;
  for (let i = 0; i < sums.length; i++) {
    if (sums[i] === 2) {
      let tmp = [];
      finalRes *= tiles[i].id;
      for (let j = 0; j < cmpMatrix[i].length; j++) {
        if (cmpMatrix[i][j].match) {
          console.log("i =", i, "j =", j, cmpMatrix[i][j]);
          tmp.push(cmpMatrix[i][j].orientations[0]);
        }
      }
      if (tmp.includes("180") && tmp.includes("270")) root = i;

      console.log("\n");
    }
  }
  console.log(root, cmpMatrix[root][root]);
  console.log(finalRes);

  const pictureWidthHeight = Math.sqrt(tiles.length) * tileSize;
  console.log(pictureWidthHeight);
  const picture = [];
  for (let i = 0; i < pictureWidthHeight; i++) {
    picture.push([]);
    for (let j = 0; j < pictureWidthHeight; j++) {
      picture[i].push(0);
    }
  }

  const ifPlaced = new Map();
  let currPos = [0, 0];
  const queue = [[root, currPos, currPos]];
  let firstTime = true;
  while (!!queue.length) {
    // console.log("queue:", queue);

    let [tileIdx, prevPosition, currPosition] = queue.shift();
    if (ifPlaced.has(tileIdx)) continue;

    let currTile = tiles[tileIdx].tile;
    let newPosition = placeRelativeTo(
      currPosition,
      currTile,
      picture,
      firstTime
    );
    firstTime = false;
    // console.log(picture.map((line) => line.join("")).join("\n"));
    ifPlaced.set(tileIdx, true);
    for (let i = 0; i < cmpMatrix.length; i++) {
      let tileCmp = cmpMatrix[tileIdx][i];
      if (tileCmp.match) {
        // console.log(i, tileCmp);
        queue.push([i, currPosition, newPosition]);
      }
    }
  }
  console.log(picture.map((line) => line.join("")).join("\n"));
  // console.log(picture);
});
