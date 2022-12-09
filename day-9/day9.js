const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => [line[0], +line.slice(2)]);

let tailTrail;

console.log('SOLUTION PART 1: ', moveRope(input, 2));

console.log('SOLUTION PART 2: ', moveRope(input, 10));

function moveRope(input, ropeLength, startPosition = [0, 0]) {
  // create new rope and array to store unique tail positions
  const rope = getRope(ropeLength, startPosition);
  tailTrail = [[...startPosition]];

  // iterate over input
  input.forEach((motion) => moveHead(motion, rope));

  return tailTrail.length;
}

function getRope(ropeLength, startPosition) {
  const rope = [];

  // add knots based on rope length
  for (let i = 0; i < ropeLength; i++) {
    rope.push([...startPosition]);
  }

  return rope;
}

function moveHead([direction, steps], rope) {
  let headPosition = rope[0];
  let tailPosition = rope[rope.length - 1];

  // determine direction, move head accordingly for n steps
  for (let n = 0; n < steps; n++) {
    switch (direction) {
      case 'L':
        headPosition[0]--;
        break;
      case 'R':
        headPosition[0]++;
        break;
      case 'U':
        headPosition[1]++;
        break;
      case 'D':
        headPosition[1]--;
        break;
    }

    // move each knot, based on the previous one
    for (let i = 1; i < rope.length; i++) {
      const prevKnot = rope[i - 1];
      const knotPosition = rope[i];

      moveKnot(prevKnot, knotPosition);
    }

    // check if position already exists in tail trail
    const positionInTrail = tailTrail.find((position) => {
      return position[0] === tailPosition[0] && position[1] === tailPosition[1];
    });

    // if not, add it
    if (!positionInTrail) tailTrail.push([...tailPosition]);
  }
}

function moveKnot(head, knot) {
  if (head[0] - knot[0] < -1) {
    // move left
    knot[0]--;
    // check for diagonal
    if (head[1] > knot[1]) knot[1]++;
    if (head[1] < knot[1]) knot[1]--;
  } else if (head[0] - knot[0] > 1) {
    // move right
    knot[0]++;
    // check for diagonal
    if (head[1] > knot[1]) knot[1]++;
    if (head[1] < knot[1]) knot[1]--;
  } else if (head[1] - knot[1] > 1) {
    // move up
    knot[1]++;
    // check for diagonal
    if (head[0] > knot[0]) knot[0]++;
    if (head[0] < knot[0]) knot[0]--;
  } else if (head[1] - knot[1] < -1) {
    // move down
    knot[1]--;
    // check for diagonal
    if (head[0] > knot[0]) knot[0]++;
    if (head[0] < knot[0]) knot[0]--;
  }
}
