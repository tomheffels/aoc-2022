const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

console.log('SOLUTION PART 1: ', quantifyMonkeyBusiness(input, 20));
console.log('SOLUTION PART 2: ', quantifyMonkeyBusiness(input, 10000, false));

function quantifyMonkeyBusiness(input, rounds, relief = true) {
  const monkeys = parseMonkeys(input);

  // round loop
  for (let round = 1; round <= rounds; round++) {
    // monkey loop
    for (let m = 0; m < monkeys.length; m++) {
      const monkey = monkeys[m];
      const { items, operation, test } = monkey;

      while (items.length) {
        // remove first item in array to inspect
        const item = items.shift();
        // console.log(`initial worry level: ${item}`);

        // change worry level using operation
        let worryLevel = operation(item);
        // console.log(`after op worry level: ${worryLevel}`);

        // if relieved, divide worry level by 3, rounded down
        if (relief) worryLevel = Math.floor(worryLevel / 3);
        // else, channel master Sun-tzu
        else worryLevel = channelSunTzu(worryLevel, monkeys);

        const { n, t, f } = test;
        const isDivisible = worryLevel % n === 0;

        // test if divisible by n; true -> t, false -> f
        if (isDivisible) {
          monkeys[t].items.push(worryLevel);
        } else {
          monkeys[f].items.push(worryLevel);
        }

        // increment monkey's inspected items
        monkey.inspected++;
      }
    }
  }

  // get the two monkeys with most inspected items and multiply those values
  const levelOfMonkeyBusiness = monkeys
    .sort((a, b) => b.inspected - a.inspected)
    .slice(0, 2)
    .reduce((total, monkey) => total * monkey.inspected, 1);

  return levelOfMonkeyBusiness;
}

function channelSunTzu(worryLevel, monkeys) {
  // get the product of all dividers
  const productOfDividers = monkeys.reduce((x, m) => x * m.test.n, 1);
  // return the worry level, modulo the product of all dividers
  return worryLevel % productOfDividers;

  // 📖 based on Chinese Remainder Theorem: https://en.wikipedia.org/wiki/Chinese_remainder_theorem
}

function parseMonkeys(input) {
  const monkeys = [];
  let currentMonkey = { inspected: 0 };

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    const monkeyLine = (i + 7) % 7;

    // parse input, add properties to monkey accordingly
    switch (monkeyLine) {
      case 1:
        currentMonkey.items = getStartingItems(line);
        break;
      case 2:
        currentMonkey.operation = getOperation(line);
        break;
      case 3:
        currentMonkey.test = {};
        currentMonkey.test.n = getTestDivider(line);
        break;
      case 4:
        currentMonkey.test.t = getTestTrue(line);
        break;
      case 5:
        currentMonkey.test.f = getTestFalse(line);
        break;
      case 6:
        // push monkey to array on empty line
        monkeys.push(currentMonkey);
        currentMonkey = { inspected: 0 };
        break;
      default:
        break;
    }
  }
  return monkeys;
}

// return array of starting items
function getStartingItems(line) {
  return line
    .slice(18)
    .split(', ')
    .map((item) => +item);
}

// return operation method
function getOperation(line) {
  let operation;
  const input = line.slice(23).split(' ');
  const operand = input[0];
  const amount = +input[1];

  switch (operand) {
    case '+':
      operation = (old) => old + (amount || old);
      break;
    case '*':
      operation = (old) => old * (amount || old);
      break;
  }

  return operation;
}

// return divider
function getTestDivider(line) {
  return +line.slice(21);
}

// return monkey index if divisible
function getTestTrue(line) {
  return +line.slice(29);
}

// return monkey index if not divisible
function getTestFalse(line) {
  return +line.slice(30);
}
