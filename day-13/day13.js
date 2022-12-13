const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((line) => eval(line));

console.log('SOLUTION PART 1: ', getPairsInOrder(input));

function getPairsInOrder(input) {
  const pairsInOrder = [];
  // loop over input and compare each pair
  for (let i = 0; i < input.length; i += 3) {
    const left = input[i];
    const right = input[i + 1];
    // if pair is in right order, push index to array
    if (comparePacketPair(left, right) < 0) {
      const pairIndex = (i + 3) / 3;
      pairsInOrder.push(pairIndex);
    }
  }
  // add up all indices in array
  return pairsInOrder.reduce((a, b) => a + b, 0);
}

console.log('SOLUTION PART 2: ', orderPairs(input, [[[2]], [[6]]]));

function orderPairs(input, dividers) {
  // add dividers and filter out empty lines
  let packets = [...input, ...dividers].filter((p) => p !== undefined);
  // sort using comparePacketPair function
  packets = packets.sort(comparePacketPair);
  // multiply indices of dividers in sorted list
  const decoderKey =
    (packets.indexOf(dividers[0]) + 1) * (packets.indexOf(dividers[1]) + 1);

  return decoderKey;
}

function comparePacketPair(l, r) {
  let i = 0;
  // while there are numbers left to check, repeat this process
  while (i < l.length && i < r.length) {
    // check if both are numbers, return difference if applicable
    if (typeof l[i] === 'number' && typeof r[i] === 'number') {
      if (l[i] != r[i]) return l[i] - r[i];
    } else {
      // else run this function again with flattened array
      const diff = comparePacketPair([l[i]].flat(), [r[i]].flat());
      if (diff != 0) return diff;
    }
    i++;
  }
  // return difference in packet length
  return l.length - r.length;
}
