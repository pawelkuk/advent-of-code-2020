fs = require("fs");
const tileSize = 10;

function matchSeaMonster(pic, seaMonster) {
  let n = 0;
  let map = new Map();
  for (let i = 0; i < pic.length - seaMonster.length; i++) {
    for (let j = 0; j < pic[0].length - seaMonster[0].length; j++) {
      let matched = true;

      for (let k = 0; k < seaMonster.length; k++) {
        for (let l = 0; l < seaMonster[0].length; l++) {
          if (seaMonster[k][l] === " ") continue;
          if (seaMonster[k][l] !== pic[i + k][j + l]) matched = false;
        }
      }
      if (matched) {
        for (let k = 0; k < seaMonster.length; k++) {
          for (let l = 0; l < seaMonster[0].length; l++) {
            if (seaMonster[k][l] === "#")
              map.set([i + k, j + l].join(","), true);
          }
        }
        n += 1;
      }
    }
  }
  let result = 0;
  for (let i = 0; i < pic.length; i++) {
    for (let j = 0; j < pic[0].length; j++) {
      if (!map.has([i, j].join(","))) {
        if (pic[i][j] === "#") result++;
      }
    }
  }
  return [n, result];
}

function removeEdges(picture) {
  return picture
    .filter((line, idx) => ![0, 9].includes(idx % tileSize))
    .map((line) =>
      line.filter((line, idx) => ![0, 9].includes(idx % tileSize))
    );
}

function match(t1, t2, side) {
  let row = null;
  if (side === "right")
    row = t1
      .map((line) => line[line.length - 1])
      .reverse()
      .join("");
  else if (side === "down") row = t1[t1.length - 1].join("");
  side = side === "down" ? "up" : side;
  for (conf of getAllConfigurations(t2, side))
    if (conf.row === row) {
      return conf.orientation;
    }
  return null;
}

const matchSecondTile = (t1, t2) => {
  let right = match(t1, t2, "right");
  if (!!right) {
    let offset = [0, tileSize];
    return [offset, right, "right"];
  }
  let down = match(t1, t2, "down");
  if (!!down) {
    let offset = [tileSize, 0];
    return [offset, down, "down"];
  }

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
    } else if (side === "down") {
      resTile = resTile.map((el) => el.reverse());
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

function getAllPicturesConf(smallPic) {
  const res = [];
  // no rotation
  res.push(smallPic);
  res.push(smallPic.map((el) => el.slice()).reverse());

  // 90 deg clockwise rotation
  let tmp = [];
  for (let i = 0; i < smallPic.length; i++) {
    tmp.push([]);
    for (let j = 0; j < smallPic.length; j++) tmp[i].push(0);
  }
  for (let i = 0; i < smallPic.length; i++)
    for (let j = 0; j < smallPic.length; j++)
      tmp[i][j] = smallPic[smallPic.length - 1 - j][i];
  res.push(tmp);
  res.push(tmp.map((el) => el.slice()).reverse());
  // 180 deg clockwise rotation
  tmp = [];
  for (let i = 0; i < smallPic.length; i++) {
    tmp.push([]);
    for (let j = 0; j < smallPic.length; j++) tmp[i].push(0);
  }
  for (let i = 0; i < smallPic.length; i++)
    for (let j = 0; j < smallPic.length; j++)
      tmp[i][j] = smallPic[smallPic.length - 1 - i][smallPic.length - 1 - j];
  res.push(tmp);
  res.push(tmp.map((el) => el.slice()).reverse());

  // 270 deg clockwise (90 deg anticlockwise)
  tmp = [];
  for (let i = 0; i < smallPic.length; i++) {
    tmp.push([]);
    for (let j = 0; j < smallPic.length; j++) tmp[i].push(0);
  }
  for (let i = 0; i < smallPic.length; i++)
    for (let j = 0; j < smallPic.length; j++)
      tmp[i][j] = smallPic[j][smallPic.length - 1 - i];
  res.push(tmp);
  res.push(tmp.map((el) => el.slice()).reverse());

  return res;
}
function getAllRotations(tile, side = "up") {
  const res = [];
  let incr = side2deg[side];
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
  let seaMonster = fs.readFileSync("./data/input_day20b.txt", "utf-8");
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
          // console.log("i =", i, "j =", j, cmpMatrix[i][j]);
          tmp.push(cmpMatrix[i][j].orientations[0]);
        }
      }
      if (tmp.includes("180") && tmp.includes("270")) root = i;
    }
  }
  // console.log(root, cmpMatrix[root][root]);
  // console.log(finalRes);

  const pictureWidthHeight = Math.sqrt(tiles.length) * tileSize;
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
    ifPlaced.set(tileIdx, true);
    for (let i = 0; i < cmpMatrix.length; i++) {
      let tileCmp = cmpMatrix[tileIdx][i];
      if (tileCmp.match) {
        queue.push([i, currPosition, newPosition]);
      }
    }
  }
  const smallPic = removeEdges(picture);
  console.log(smallPic.map((line) => line.join("")).join("\n"));
  seaMonster = seaMonster.split("\n").map((el) => Array.from(el));
  res = 0;
  for (p of getAllPicturesConf(smallPic)) {
    res = matchSeaMonster(p, seaMonster);
    if (res[0] !== 0) console.log(res[1]);
  }
});
