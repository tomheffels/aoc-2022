const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const root = {
  dirName: '/',
  children: [],
  size: 0
};
let currentDir;
const directories = [root];

parseTerminalOutput();

console.log('SOLUTION PART 1: ', getSumOfDirectories(100000));

function getSumOfDirectories(maxSize) {
  directories.forEach((dir) => dir.size);

  return (
    directories
      // filter out directories larger than max size
      .filter((dir) => dir.size < maxSize)
      // return the sum of all directories' sizes
      .reduce((sum, dir) => sum + dir.size, 0)
  );
}

console.log('SOLUTION PART 2: ', makeRequiredSpace(70000000, 30000000));

function makeRequiredSpace(diskSize, required) {
  const requiredSpace = required - (diskSize - root.size);

  return (
    directories
      // filter out directories smaller than required space
      .filter((dir) => dir.size > requiredSpace)
      // sort directories by size (desc), return size of the smallest
      .sort((a, b) => a.size - b.size)[0].size
  );
}

function parseTerminalOutput() {
  input.forEach((line) => {
    line = line.split(' ');
    // parse first segment of each line
    switch (line[0]) {
      case '$':
        if (line[1] === 'cd') changeDirectory(line[2]);
        break;
      case 'dir':
        createDirectory(line[1]);
        break;
      default:
        createFile(line[0], line[1]);
        break;
    }
  });

  // update size for directories in current path
  while (currentDir !== root) {
    currentDir = currentDir.parent;
    updateSize();
  }
}

function changeDirectory(dirName) {
  switch (dirName) {
    case '/':
      // change current directory to root
      currentDir = root;
      break;
    case '..':
      // change current directory to parent and update its size
      currentDir = currentDir.parent;
      updateSize();
      break;
    default:
      currentDir = currentDir.children.find((dir) => dir.dirName === dirName);
      break;
  }
}

function createDirectory(dirName) {
  // create new directory
  const dir = {
    dirName,
    parent: currentDir,
    children: [],
    size: 0
  };

  // add it to current directory
  currentDir.children.push(dir);

  // if it is not in the directories array yet, add it
  const findCurrent = directories.find(
    (dir) => dir.dirName === dirName && dir.parent === currentDir
  );

  if (!findCurrent) directories.push(dir);
}

function createFile(size, fileName) {
  // create file
  const file = { fileName, size: +size };

  // add file to current directory
  currentDir.children.push(file);

  updateSize();
}

function updateSize() {
  // update current directory's size
  currentDir.size = currentDir.children.reduce(
    (size, file) => size + file.size,
    0
  );
}
