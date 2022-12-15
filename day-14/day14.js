const fs = require('fs');

function getInput() {
  return fs
    .readFileSync('input.txt', 'utf-8')
    .split('\n')
    .map((line) =>
      line.split(' -> ').map((point) => {
        const [x, y] = point.split(',');
        return { x: +x, y: +y };
      })
    );
}

const { log } = console;
log('SOLUTION PART 1: ', getSandCapacity(getInput()));
log('SOLUTION PART 2: ', getSandCapacity(getInput(), 2));

function getSandCapacity(input, floor = 0) {
  // get abyss depth and cave, set count and loop booleans
  const { cave, abyssDepth } = buildCave(input, floor);
  let sandInCave = 0;
  let intoTheAbyss = false;
  let sandIsFalling = true;

  while (sandIsFalling && !intoTheAbyss) {
    // a new unit of sand drops
    let point = { x: 500, y: 0 };
    let { x, y } = point;

    while (sandIsFalling && !intoTheAbyss) {
      sandIsFalling = !cave.has(`${x},${y}`);
      // check for rock or sand below
      if (!cave.has(`${x},${y + 1}`)) {
        y++;
        // else check to the left
      } else if (!cave.has(`${x - 1},${y + 1}`)) {
        x--;
        y++;
        // else check to the right
      } else if (!cave.has(`${x + 1},${y + 1}`)) {
        x++;
        y++;
        // else add point to cave (sand or rock makes no difference here)
      } else {
        // log(`${x},${y}`);
        cave.add(`${x},${y}`);
        break;
      }
      // update booleans
      sandIsFalling = !cave.has(`${x},${y}`);
      intoTheAbyss = y >= abyssDepth;
    }

    // as long as sand is falling, and not into the abyss, add one unit
    if (sandIsFalling && !intoTheAbyss) sandInCave++;
  }
  return sandInCave;
}

function buildCave(input, floor) {
  const cave = new Set();
  const abyssDepth = getAbyssDepth(input, floor);

  // loop over input
  input.forEach((line) => {
    // get first point (current)
    let current = line.shift();
    let { x, y } = current;

    while (line.length) {
      // get next point as target
      let target = line.shift();

      while (x !== target.x || y !== target.y) {
        // add rock point to the cave
        const point = `${x},${y}`;
        cave.add(point);

        // manipulate x or y to move current towards target
        if (x !== target.x) {
          if (x > target.x) x--;
          else x++;
        } else {
          if (y > target.y) y--;
          else y++;
        }
      }
      // add target point
      cave.add(`${x},${y}`);
    }
  });

  // build "infinite" floor
  if (floor > 0) {
    for (let i = -2000; i < 2000; i++) {
      cave.add(`${i},${abyssDepth}`);
    }
  }

  return { cave, abyssDepth };
}

function getAbyssDepth(input, floor) {
  let abyssDepth = 0;

  input.forEach((line) => {
    line.forEach((point) => {
      // check all points; highest y is the lowest rock
      if (point.y > abyssDepth) abyssDepth = point.y;
    });
  });

  return abyssDepth + floor;
}
