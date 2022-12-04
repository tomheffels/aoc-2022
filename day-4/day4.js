const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((pair) =>
    pair.split(',').map((range) => range.split('-').map((n) => +n))
  );

console.log('SOLUTION PART 1: ', getPairsContained());

function getPairsContained() {
  let pairsContained = 0;

  input.forEach((pair) => {
    if (checkIfContained(pair)) pairsContained++;
  });

  return pairsContained;
}

function checkIfContained([one, two]) {
  return (
    (one[0] <= two[0] && one[1] >= two[1]) ||
    (one[0] >= two[0] && one[1] <= two[1])
  );
}

console.log('SOLUTION PART 2: ', getOverlappingPairs());

function getOverlappingPairs() {
  let overlappingPairs = 0;

  input.forEach((pair) => {
    if (checkForOverlap(pair)) overlappingPairs++;
  });

  return overlappingPairs;
}

function checkForOverlap([one, two]) {
  const rangeOne = [];

  for (let n = one[0]; n <= one[1]; n++) {
    rangeOne.push(n);
  }

  for (let n = two[0]; n <= two[1]; n++) {
    if (rangeOne.indexOf(n) > -1) return true;
  }

  return false;
}
