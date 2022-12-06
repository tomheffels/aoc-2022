const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

console.log('SOLUTION PART 1: ', getMarker(input, 4));
console.log('SOLUTION PART 2: ', getMarker(input, 14));

function getMarker(input, markerLength) {
  let chars = [];
  let count = 0;

  for (let i = 0; chars.length < markerLength; i++) {
    const char = input[i];
    const x = markerLength - 1;
    const lastX = chars.slice(-x);
    const charIndex = lastX.indexOf(char);
    const uniqueChar = charIndex === -1;

    if (!uniqueChar) chars = chars.slice(charIndex + 1);

    chars.push(char);
    count++;
  }

  return count;
}
