fs = require("fs");

function calcDestLabel(currLabel, adjArr, max) {
  let newLabel = currLabel - 1;
  if (newLabel <= 0) {
    let currMax = max;
    while (true) {
      if (!adjArr.includes(currMax)) {
        break;
      } else currMax -= 1;
    }
    return currMax;
  }
  if (!adjArr.includes(newLabel)) return newLabel;
  else return calcDestLabel(newLabel, adjArr, max);
}

function Node(val) {
  this.val = val;
  this.prev = null;
  this.next = null;
}

function LinkedList(initVal) {
  const rootNode = new Node(initVal);
  this.first = rootNode;
  this.last = this.first;
  this.memory = new Map();
  this.memory.set(rootNode.val, rootNode);
}
LinkedList.prototype.insert = function (val, idx = -1) {
  const node = new Node(val);
  if (idx === -1) {
    this.last.next = node;
    node.prev = this.last;
    this.last = node;
  } else if (idx === 0) {
    this.first.prev = node;
    node.next = this.first;
    this.first = node;
  } else {
    if (idx > this.memory.size) throw "Index not in linked list";
    let oldNode = this.first;
    for (let i = 0; i < idx; i++) {
      oldNode = oldNode.next;
    }
    oldNode.prev.next = node;
    node.prev = oldNode.prev;
    node.next = oldNode;
    oldNode.prev = node;
  }
  this.memory.set(node.val, node);
};
LinkedList.prototype.toArray = function () {
  const arr = [];
  let node = this.first;
  while (node !== null) {
    arr.push(node.val);
    node = node.next;
  }
  return arr;
};
LinkedList.prototype.getAtIdx = function (idx) {
  let node = this.first;
  for (let i = 0; i < idx; i++) {
    node = node.next;
  }
  return node.val;
};
LinkedList.prototype.getAndRemoveAfter = function (val, n = 3) {
  let node = this.memory.get(val);
  let currNode = node;
  const retArr = [];
  for (let i = 0; i < n; i++) {
    if (node.next === null) break;
    node = node.next;
    retArr.push(node.val);
  }
  currNode.next = node.next;
  if (node.next !== null) node.next.prev = currNode;
  return retArr;
};

LinkedList.prototype.shift = function () {
  res = this.first.val;
  this.first = this.first.next;
  this.first.prev = null;
  return res;
};

LinkedList.prototype.insertAfterValue = function (after, val) {
  const nodeToInsAfter = this.memory.get(after);
  const node = new Node(val);
  node.next = nodeToInsAfter.next;
  node.prev = nodeToInsAfter;
  nodeToInsAfter.next = node;
  this.memory.set(node.val, node);
};

fs.readFile("./data/input_day23.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  data = Array.from(data).map((n) => Number(n));
  let max = Math.max(...data);
  const nums = new LinkedList(data[0]);
  data.forEach((element, idx) => {
    if (idx !== 0) nums.insert(element);
  });
  let currLabel = nums.getAtIdx(0);
  for (let i = max + 1; i <= 1e6; i++) nums.insert(i);
  console.log("inserted");
  max = 1e6;
  for (let round = 0; round < 1e7; round++) {
    if (round % 100000 === 0) console.log(round);

    let atMostThreeAdjacent = nums.getAndRemoveAfter(currLabel);

    let rest = 3 - atMostThreeAdjacent.length;

    for (let i = 0; i < rest; i++) {
      atMostThreeAdjacent.push(nums.shift());
    }

    let destLabel = calcDestLabel(currLabel, atMostThreeAdjacent, max);
    for (let i = 0; i < atMostThreeAdjacent.length; i++) {
      destVal = atMostThreeAdjacent[i];
      nums.insertAfterValue(destLabel, destVal);
      destLabel = destVal;
    }
    next = nums.memory.get(currLabel).next;
    if (next !== null) currLabel = next.val;
    else currLabel = nums.first.val;
  }
  let [n1, n2] = nums.getAndRemoveAfter(1, 2);
  console.log(n1 * n2, n1, n2);
});
