const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => [line.slice(0, 4), +line.slice(5)]);

let crt;

console.log('SOLUTION PART 1:', processCpuSignal(input));

function processCpuSignal(input, cycles = 240, crtRows = 6, crtWidth = 40) {
  // initialize CRT, X value and signal strengths array
  crt = initializeCrt(crtRows, crtWidth);
  let registerX = 1;
  const signalStrengths = [];

  // create instruction variables
  let i = 0;
  let currentInstruction;
  let addNextCycle = 0;

  for (let cycle = 1; cycle <= cycles; cycle++) {
    // set current instruction and isolate the amount
    currentInstruction = input[i];
    let [instruction, amount] = currentInstruction;

    drawPixel(cycle, registerX, crt);

    // save signal strength for cycle 20 and each subsequent 40th cycle
    if (cycle === 20 || (cycle - 20) % 40 === 0) {
      const signalStrength = registerX * cycle;
      signalStrengths.push(signalStrength);
    }

    // add to X on 2nd cycle of addx instruction
    registerX += addNextCycle;

    // if instruction is noop or we're on the 2nd cycle of addx
    if (instruction === 'noop' || addNextCycle !== 0) {
      // move on to next instruction and reset addNextCycle
      i++;
      addNextCycle = 0;
      // else set addNextCycle for 2nd cycle
    } else addNextCycle = amount;
  }

  // return sum of saved signal strengths
  return signalStrengths.reduce((sum, x) => sum + x, 0);
}

console.log('SOLUTION PART 2: ', viewCrt());

function viewCrt() {
  // replace . and # for readability (and sweet CRT aesthetics)
  for (let i = 0; i < crt.length; i++) {
    const row = crt[i];
    for (let p = 0; p < row.length; p++) {
      const pixel = row[p];
      if (pixel === '.') row[p] = '░';
      else row[p] = '█';
    }
  }

  // return crt, joining each row of pixels
  return crt.map((row) => row.join(''));
}

function initializeCrt(rows, width) {
  const crt = [];

  // draw initial CRT
  for (let row = 0; row < rows; row++) {
    crt[row] = [];
    for (let pixel = 0; pixel < width; pixel++) {
      crt[row].push('.');
    }
  }

  return crt;
}

function drawPixel(cycle, x, crt) {
  // calculate current row, pixel and sprite
  const row = Math.ceil(cycle / 40) - 1;
  const pixel = (cycle % 40) - 1;
  const sprite = [pixel - 1, pixel, pixel + 1];

  // pixel lights up if in sprite
  if (sprite.indexOf(x) >= 0) crt[row][pixel] = '#';
}
