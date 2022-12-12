const fs = require('fs');

function getInput() {
  return fs
    .readFileSync('input.txt', 'utf-8')
    .split('\n')
    .map((line, row) =>
      line.split('').map((square, col) => {
        return {
          row,
          col,
          height: getHeight(square),
          letter: square,
          visited: false
        };
      })
    );
}

let input = getInput();

console.log('SOLUTION PART 1: ', getShortestRoute(input));

function getShortestRoute(map) {
  // get map height and width, start and end squares
  const { h, w, start, end } = getMapData(map);
  // initialize queue with starting square
  let queue = [start];
  let current;

  // loop while there are squares in the queue
  while (queue.length) {
    // get first square from queue
    current = queue.shift();
    // set to visited
    current.visited = true;
    // find unvisited, adjacent squares, and add them to the queue
    queueAdjacentSquares(map, current, queue, h, w);
  }

  // return the distance on the end square
  return end.distance;
}

input = getInput();
console.log('SOLUTION PART 2: ', getShortestRouteFromHeight(input, 1));

function getShortestRouteFromHeight(map, startHeight) {
  // get map height and width, and array of start positions
  const { h, w, start: startPositions } = getMapData(map, startHeight);
  // initialize array to store route lengths
  const routes = [];

  // loop over each start position and find shortest route
  startPositions.forEach((s) => {
    const [row, col] = s;
    map = getInput();
    const startSquare = map[row][col];
    startSquare.distance = 0;

    // initialize queue with start square
    const queue = [startSquare];
    let current;
    let x = 0;

    // loop while there are squares left in the queue
    while (queue.length) {
      // get first square from queue
      current = queue.shift();
      // set to visited
      current.visited = true;
      // find adjacent, unvisited squares, and add them to the queue
      queueAdjacentSquares(map, current, queue, h, w);

      // if the current square is the end, add its distance to routes
      if (current.letter === 'E') {
        routes.push(current.distance);
        break;
      }
    }
  });

  // sort route lengths (ascending) and take the shortest one
  const fastestRoute = routes.sort((a, b) => a - b)[0];

  return fastestRoute;
}

function getMapData(map, startHeight = undefined) {
  // get map length and height
  const mapData = {
    h: map.length,
    w: map[0].length
  };

  // search for start and end
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      let square = input[row][col];

      // if there's a start height, make an array of possible starting points
      if (startHeight) {
        if (!mapData.start) mapData.start = [];
        if (square.height === 1) {
          square = [row, col];
          mapData.start.push(square);
        }
        // else assign single start and end point
      } else {
        if (square.letter === 'S') {
          square.distance = 0;
          mapData.start = square;
        }
        if (square.letter === 'E') mapData.end = square;
      }
    }
  }

  return mapData;
}

function queueAdjacentSquares(map, square, queue, h, w) {
  const { row, col, height, distance } = square;
  let r1, c1;
  // loop over deltas for adjacent squares
  [
    [-1, 0], // up
    [1, 0], // down
    [0, -1], // left
    [0, 1] // right
  ].forEach((d) => {
    r1 = row + d[0];
    c1 = col + d[1];

    // check if square is in range
    if (r1 >= 0 && r1 < h && c1 >= 0 && c1 < w) {
      const adjacent = map[r1][c1];
      // check if square is unvisited
      if (!adjacent.visited) {
        // check if the square is not too high
        if (adjacent.height <= height + 1) {
          adjacent.distance = distance + 1;
          // if this square is not in the queue yet, add it
          if (!queue.find((s) => s === adjacent)) {
            queue.push(adjacent);
          }
        }
      }
    }
  });
}

// get the square's height
function getHeight(letter) {
  if (letter === 'S') return 1;
  if (letter === 'E') return 26;
  return letter.charCodeAt(0) - 96;
}
