const fs = require('fs');

const input = fs
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map((x) => x.split(' '));

const evaluateRound = (opMove, myMove) => {
  let movePoints;
  let outcomePoints;

  switch (opMove) {
    case 'A':
      switch (myMove) {
        case 'X':
          movePoints = 1;
          outcomePoints = 3;
          break;
        case 'Y':
          movePoints = 2;
          outcomePoints = 6;
          break;
        case 'Z':
          movePoints = 3;
          outcomePoints = 0;
          break;
      }
      break;
    case 'B':
      switch (myMove) {
        case 'X':
          movePoints = 1;
          outcomePoints = 0;
          break;
        case 'Y':
          movePoints = 2;
          outcomePoints = 3;
          break;
        case 'Z':
          movePoints = 3;
          outcomePoints = 6;
          break;
      }
      break;
    case 'C':
      switch (myMove) {
        case 'X':
          movePoints = 1;
          outcomePoints = 6;
          break;
        case 'Y':
          movePoints = 2;
          outcomePoints = 0;
          break;
        case 'Z':
          movePoints = 3;
          outcomePoints = 3;
          break;
      }
      break;
  }

  return movePoints + outcomePoints;
};

const getTournamentTotal = () => {
  let totalPoints = 0;

  input.forEach((round) => {
    const [opMove, myMove] = round;
    const roundPoints = evaluateRound(opMove, myMove);
    totalPoints += roundPoints;
  });

  return totalPoints;
};

console.log('SOLUTION PART 1: ', getTournamentTotal());

const evaluateRoundPart2 = (opMove, result) => {
  let movePoints;
  let outcomePoints;

  switch (opMove) {
    case 'A':
      switch (result) {
        case 'X':
          movePoints = 3;
          outcomePoints = 0;
          break;
        case 'Y':
          movePoints = 1;
          outcomePoints = 3;
          break;
        case 'Z':
          movePoints = 2;
          outcomePoints = 6;
          break;
      }
      break;
    case 'B':
      switch (result) {
        case 'X':
          movePoints = 1;
          outcomePoints = 0;
          break;
        case 'Y':
          movePoints = 2;
          outcomePoints = 3;
          break;
        case 'Z':
          movePoints = 3;
          outcomePoints = 6;
          break;
      }
      break;
    case 'C':
      switch (result) {
        case 'X':
          movePoints = 2;
          outcomePoints = 0;
          break;
        case 'Y':
          movePoints = 3;
          outcomePoints = 3;
          break;
        case 'Z':
          movePoints = 1;
          outcomePoints = 6;
          break;
      }
      break;
  }

  return movePoints + outcomePoints;
};

const getTournamentTotalPart2 = () => {
  let totalPoints = 0;

  input.forEach((round, i) => {
    const [opMove, result] = round;
    const roundPoints = evaluateRoundPart2(opMove, result);
    totalPoints += roundPoints;
  });

  return totalPoints;
};

console.log('SOLUTION PART 2: ', getTournamentTotalPart2());
