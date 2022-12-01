const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((x) => +x);

const getElves = () => {
  let currentElf = 0;
  let elves = [];

  for (let i = 0; i < input.length; i++) {
    const snack = input[i];
    if (snack > 0) {
      currentElf += snack;
    } else {
      elves.push(currentElf);
      currentElf = 0;
    }
  }

  return elves;
};

const sortedElves = getElves().sort((a, b) => b - a);

console.log('SOLUTION PART 1: ', sortedElves[0]);

const sumTopThree = sortedElves[0] + sortedElves[1] + sortedElves[2];

console.log('SOLUTION PART 2: ', sumTopThree);
