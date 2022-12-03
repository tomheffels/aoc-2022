const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

console.log('SOLUTION PART 1: ', getTotalPriority());

function getTotalPriority() {
  let totalPriority = 0;
  input.forEach((bag) => {
    const sharedItem = getSharedItem(bag);
    const itemPriority = getPriority(sharedItem);

    totalPriority += itemPriority;
  });

  return totalPriority;
}

function getCompartments(bag) {
  const i = bag.length / 2;
  return [bag.slice(0, i), bag.slice(i)];
}

function getSharedItem(bag) {
  const [compOne, compTwo] = getCompartments(bag);
  let sharedItem;

  for (let i = 0; i < compOne.length; i++) {
    const itemOne = compOne[i];
    for (let j = 0; j < compTwo.length; j++) {
      const itemTwo = compTwo[j];
      if (itemOne === itemTwo) {
        sharedItem = itemOne;
        break;
      }
    }
    if (sharedItem) break;
  }

  return sharedItem;
}

function getPriority(item) {
  return item === item.toUpperCase()
    ? item.charCodeAt(0) - 38
    : item.charCodeAt(0) - 96;
}

// PART 2
console.log('SOLUTION PART 2: ', getTotalBadgePriority());

function getTotalBadgePriority() {
  const groups = getGroups();
  let totalBadgePriority = 0;

  groups.forEach((group) => {
    const badge = getBadge(group);
    const badgePriority = getPriority(badge);
    totalBadgePriority += badgePriority;
  });

  return totalBadgePriority;
}

function getGroups() {
  const groups = [];

  for (let i = 0; i < input.length; i += 3) {
    const group = input.slice(i, i + 3);
    groups.push(group);
  }

  return groups;
}

function getBadge([bagOne, bagTwo, bagThree]) {
  let badge;
  for (let i = 0; i < bagOne.length; i++) {
    const itemOne = bagOne[i];
    for (let j = 0; j < bagTwo.length; j++) {
      const itemTwo = bagTwo[j];
      for (let k = 0; k < bagThree.length; k++) {
        const itemThree = bagThree[k];
        if (itemOne === itemTwo && itemOne === itemThree) {
          badge = itemOne;
          break;
        }
      }
      if (badge) break;
    }
    if (badge) break;
  }
  return badge;
}
