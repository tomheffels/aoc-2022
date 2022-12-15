const { readFileSync } = require('fs');
const { log } = console;

log('SOLUTION PART 1: ', countBeaconlessPoints(2000000));

function countBeaconlessPoints(y) {
  const { sensors, beacons } = getInput();
  const points = new Set();

  for (let i = 0; i < sensors.length; i++) {
    // get current sensor and beacon
    const sensor = sensors[i],
      beacon = beacons[i];
    // get Manhattan distance and distance to row
    const distanceToBeacon = getManhattanDistance(sensor, beacon);
    const distanceToRow = sensor.y > y ? sensor.y - y : y - sensor.y;

    // if target y is closer than beacon
    if (distanceToBeacon > distanceToRow) {
      const diff = distanceToBeacon - distanceToRow;

      // use difference to calculate range of x values
      for (let x = sensor.x - diff; x <= sensor.x + diff; x++) {
        const isBeacon = beacons.find((b) => b.x === x && b.y === y);

        // if there's no beacon, add this point
        if (!isBeacon) {
          let point = `${x},${y}`;
          points.add(point);
        }
      }
    }
  }
  //return set size
  return points.size;
}

log('SOLUTION PART 2: ', getTuningFrequency(0, 4000000));

function getTuningFrequency(min, max) {
  const { sensors, beacons } = getInput();
  let tx, ty;

  for (let y = min; y <= max; y++) {
    const xRanges = [];

    for (let i = 0; i < sensors.length; i++) {
      // get current sensor and beacon
      const sensor = sensors[i],
        beacon = beacons[i];
      // get Manhattan distance and distance to row
      const distanceToBeacon = getManhattanDistance(sensor, beacon);
      const distanceToRow = sensor.y > y ? sensor.y - y : y - sensor.y;

      if (distanceToBeacon > distanceToRow) {
        const diff = distanceToBeacon - distanceToRow;

        // lower bound is 0 or (x - diff), upper is 4M or (x + diff)
        const lb = Math.max(sensor.x - diff, min),
          ub = Math.min(sensor.x + diff, max);

        // add range to array
        xRanges.push([lb, ub]);
      }
    }

    // sort ranges (by lower bound)
    const sortedRanges = xRanges.sort((a, b) => a[0] - b[0]);

    let x = 0;
    while (x < max) {
      //  take first element of filtered ranges (sorted by upper bound)
      const nextRange = sortedRanges
        .filter((r) => {
          return r[0] <= x;
        })
        .sort((a, b) => b[1] - a[1])[0];

      // if upper bound is equal to x, we have a winner
      if (nextRange[1] === x) {
        tx = x + 1;
        ty = y;
        break;
      }

      //else set x to upper bound
      x = nextRange[1];
    }
    if (tx) break;
  }

  // calculate tuning frequency
  const tuningFrequency = tx * 4000000 + ty;

  return tuningFrequency;
}

// parse input and sort into sensors and beacons array
function getInput() {
  const sensors = [];
  const beacons = [];
  const input = readFileSync('input.txt', 'utf-8')
    .split('\n')
    .map((line) => {
      line = line.split(' ');
      return {
        sx: +line[2].slice(2, -1),
        sy: +line[3].slice(2, -1),
        bx: +line[8].slice(2, -1),
        by: +line[9].slice(2)
      };
    });

  input.forEach(({ sx, sy, bx, by }) => {
    sensors.push({ x: sx, y: sy });
    beacons.push({ x: bx, y: by });
  });

  return { sensors, beacons };
}

function getManhattanDistance({ x: sx, y: sy }, { x: bx, y: by }) {
  // add up distence between x's and y's
  const xd = sx > bx ? sx - bx : bx - sx;
  const yd = sy > by ? sy - by : by - sy;
  const manhattanDistance = xd + yd;

  return manhattanDistance;
}
