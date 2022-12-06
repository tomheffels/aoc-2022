const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8');

console.log('SOLUTION PART 1: ', getMarker(input, 4));
console.log('SOLUTION PART 2: ', getMarker(input, 14));

function getMarker(input, markerLength) {
  let i,
    chars = [];

  for (i = 0; chars.length < markerLength; i++) {
    const char = input[i];
    const charIndex = chars.indexOf(char);
    const uniqueChar = charIndex === -1;

    if (!uniqueChar) chars = chars.slice(charIndex + 1);

    chars.push(char);
  }

  return i;
}
