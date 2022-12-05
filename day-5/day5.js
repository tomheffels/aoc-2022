const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

console.log('SOLUTION PART 1: ', moveBoxes());

function moveBoxes() {
  const stacks = getStacks();
  const moves = getMoves();

  moves.forEach((move) => {
    const { a, b, n } = move;

    for (let i = 0; i < n; i++) {
      const box = stacks[a].pop();

      stacks[b].push(box);
    }
  });

  return getCratesOnTop(stacks);
}

function getCratesOnTop(stacks) {
  let cratesOnTop = [];

  Object.values(stacks).forEach((stack) => {
    const top = stack.pop();
    cratesOnTop.push(top);
  });

  return cratesOnTop.join('');
}

console.log('SOLUTION PART 2: ', moveBoxesFast());

function moveBoxesFast() {
  const stacks = getStacks();
  const moves = getMoves();

  moves.forEach((move) => {
    const { a, b, n } = move;

    const boxes = stacks[a].slice(-n);
    stacks[b] = stacks[b].concat(boxes);

    for (let i = 0; i < n; i++) {
      stacks[a].pop();
    }
  });

  return getCratesOnTop(stacks);
}

function getStacks() {
  const stacks = {};

  for (let i = 0; i < 8; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j += 4) {
      const block = row.substring(j, j + 4);
      const letter = block[1];
      const current = j / 4 + 1;

      if (!stacks[current]) stacks[current] = [];
      if (letter !== ' ') stacks[current].unshift(letter);
    }
  }

  return stacks;
}

function getMoves() {
  const moves = [];

  for (let i = 10; i < input.length; i++) {
    const line = input[i].split(' ');
    const move = {
      n: +line[1],
      a: +line[3],
      b: +line[5]
    };
    moves.push(move);
  }

  return moves;
}
