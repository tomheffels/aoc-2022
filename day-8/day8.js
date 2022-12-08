const fs = require('fs');

const grid = [];
fs.readFileSync('input.txt', 'utf-8')
  .split('\n')
  .forEach((row) => {
    row = row.split('').map((n) => +n);
    grid.push(row);
  });

console.log('SOLUTION PART 1: ', countVisibleTrees());

function countVisibleTrees() {
  let count = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (checkEdges(x, y) || checkRowsAndColumns(x, y)) count++;
    }
  }

  return count;
}

function checkEdges(x, y) {
  // check if current tree is on the edge of the grid
  return (
    x === 0 || y === 0 || x === grid.length - 1 || y === grid[x].length - 1
  );
}

function checkRowsAndColumns(x, y) {
  const currentTree = grid[x][y];
  const desc = (a, b) => b - a;

  // check if highest tree in each direction is lower than current tree
  const left = grid[x].slice(0, y).sort(desc)[0] < currentTree;
  const right = grid[x].slice(y + 1).sort(desc)[0] < currentTree;
  const top =
    grid
      .map((r) => r[y])
      .slice(0, x)
      .sort(desc)[0] < currentTree;
  const bottom =
    grid
      .map((r) => r[y])
      .slice(x + 1)
      .sort(desc)[0] < currentTree;

  return left || right || top || bottom;
}

console.log('SOLUTION PART 2: ', getHighestScenicScore());

function getHighestScenicScore() {
  let highScore = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      const score = getScenicScore(x, y);
      if (score > highScore) highScore = score;
    }
  }

  return highScore;
}

function getScenicScore(x, y) {
  const currentTree = grid[x][y];

  // create arrays with trees in each direction (order reversed for left and top)
  const left = grid[x].slice(0, y).reverse();
  const right = grid[x].slice(y + 1);
  const top = grid
    .map((r) => r[y])
    .slice(0, x)
    .reverse();
  const bottom = grid.map((r) => r[y]).slice(x + 1);

  // calculate distance to first visible tree in each direction and multiply them
  const score = [left, right, top, bottom].reduce((totalScore, direction) => {
    const findTallerTree = direction.find((tree) => tree >= currentTree);
    const tallerTreeIndex = direction.indexOf(findTallerTree);

    const directionScore = findTallerTree
      ? tallerTreeIndex + 1
      : direction.length;

    return totalScore * directionScore;
  }, 1);

  return score;
}
